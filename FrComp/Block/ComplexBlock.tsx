import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlinePlus,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import Views from "../../Components/Views";
import functionParser from "../functions/functionParser";
import FComp from "./FComp";
import { Validation } from "./Validation";

export default function ComplexBlock({
  schema,
  Data,
  setData,
  CusState,
  setCusState,
  validation,
}) {
  const [OpenDia, setOpenDia] = useState(false);
  const [EditKey, setEditKey] = useState(false);
  function AdderDia() {
    let id = uuidv4();
    let _ind = Data.findIndex((e) => e.id == EditKey);
    const [_Data, set_Data] = useState(EditKey ? Data[_ind] : { id });

    let _val = (e?) =>
      validation && Validation(schema, _Data)
        ? e
          ? Validation(schema, _Data)[e]
          : Validation(schema, _Data)
        : null;

    return (
      <>
        {OpenDia && (
          <div className="fixed z-50 w-full h-full left-0 top-0 bg-gray-400 backdrop-blur  bg-opacity-25 ">
            <div className="bg-white text-left shadow-lg text-gray-900 m-14 ">
              <div className="flex mb-3 px-6 py-3 border-b-2">
                <div className="text-2xl">
                  {EditKey ? `Edit ${EditKey}` : "Add New"}
                </div>
                <button
                  onClick={() => {
                    setEditKey(false);
                    setOpenDia(false);
                  }}
                  className="ml-auto  p-2 text-red-500 bg-red-50 hover:bg-red-100"
                >
                  <AiOutlineClose className="w-4 h-4 " />
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-row flex-wrap">
                  {schema.map((comp) => {
                    const [_props, set_props] = useState(comp.props);

                    let data = {
                      _props,
                      set_props,
                      Data: _Data,
                      setData: set_Data,
                      CusState,
                      setCusState,
                    };

                    useEffect(() => {
                      if (comp && comp.load) {
                        functionParser({
                          func: comp.load,
                          data: data,
                        });
                      }
                    }, [0]);

                    function Contitional() {
                      return functionParser({
                        func: comp.contition,
                        data: data,
                      });
                    }

                    return (
                      <React.Fragment key={comp.id}>
                        {comp.contition ? (
                          Contitional() && (
                            <FComp
                              comp={comp}
                              Data={_Data}
                              setData={set_Data}
                              _props={_props}
                              validate={_val(comp.id)}
                            />
                          )
                        ) : (
                          <FComp
                            comp={comp}
                            Data={_Data}
                            setData={set_Data}
                            _props={_props}
                            validate={_val(comp.id)}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div className="px-6 py-3 border-t-2">
                <button
                  disabled={_val()}
                  className={`${
                    _val() ? "bg-gray-600" : "bg-blue-700"
                  }    px-4 py-2 text-blue-100 rounded-md `}
                  onClick={() => {
                    if (EditKey) {
                      setData((e) => {
                        let _ = [...e];
                        // _[EditKey]=_Data

                        _[_ind] = _Data;
                        return _;
                      });
                    } else {
                      setData((e) => [...e, _Data]);
                    }
                    setOpenDia(false);
                    setEditKey(false);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const [Selected, setSelected] = useState([]);
  return (
    <div>
      <div className="my-2 inline-flex w-full">
        <button
          className="inline-flex bg-slate-100 px-3 py-1"
          onClick={() => {
            setOpenDia(true);
          }}
        >
          <AiOutlinePlus className="relative top-1 " />
          <span>Add Item</span>
        </button>
        {Selected.length !== 0 && (
          <div className="ml-5">
            <button
              className="hover:bg-red-50 rounded p-2 mr-2 "
              onClick={() => {
                setData((e) => {
                  let _e = e.filter((each) => Selected.indexOf(each.id) == -1);
                  return _e;
                });
                setSelected([]);
              }}
            >
              <AiOutlineDelete className="w-4 h-4 text-red-900" />
            </button>
          </div>
        )}
        {Selected.length !== 0 && (
          <div className="p-1 px-3 rounded-full my-auto ml-auto bg-blue-50 text-xs h-max text-blue-900">
            {Selected.length} item selected
          </div>
        )}
      </div>
      <div className="overflow-auto">
        <table className="w-full border-collapse border">
          <thead className="px-3">
            <tr>
              <th className="px-3"></th>
              <th className="px-3"></th>
              {schema.map((e) => (
                <th className="px-3" key={e.id}>
                  {e.id}
                </th>
              ))}
            </tr>
          </thead>
          {Data && Data.length !== 0 && (
            <tbody>
              {Data.map((row, i) => {
                return (
                  <tr className="border-t-2" key={i + "row"}>
                    <th className="px-3">
                      <input
                        onChange={() => {
                          // console.log(Selected.indexOf(row.id), row, "wwwwww");

                          if (Selected.indexOf(row.id) == -1) {
                            setSelected([...Selected, row.id]);
                          } else {
                            setSelected(Selected.filter((e) => e !== row.id));
                          }
                        }}
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="checkbox"
                        checked={!(Selected.indexOf(row.id) == -1)}
                      />
                    </th>
                    <td className="py-1 px-3">
                      <div className="inline-flex">
                        <button
                          className="bg-blue-50 p-2 mr-2 rounded-full"
                          onClick={() => {
                            setOpenDia(true);
                            setEditKey(row.id);
                          }}
                        >
                          <AiOutlineEdit className="w-4 h-4 text-blue-900" />
                        </button>
                        <button
                          className="bg-red-50 p-2 mr-2 rounded-full"
                          onClick={() => {
                            setData((e) => e.filter((_e) => _e.id !== row.id));
                          }}
                        >
                          <AiOutlineDelete className="w-4 h-4 text-red-900" />
                        </button>
                      </div>
                    </td>

                    {schema.map((e) => (
                      <td
                        key={e.id}
                        className="border-l-2 max-h-52 py-1 px-3 max-w-md"
                      >
                        {React.createElement(
                          Views[e.type],
                          { props: { ...e.props, value: row[e.id] } },
                          null
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {!Data ||
          (Data.length == 0 && (
            <div className="w-full flex flex-col place-items-center my-20">
              <AiOutlineFileAdd className="text-gray-500" size="80" />
              
              
              <p className="text-blue-900 text-xl">
                No data found. Add new Data
              </p>
            </div>
          ))}
      </div>
      <AdderDia />
    </div>
  );
}
