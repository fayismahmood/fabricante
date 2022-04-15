import React, { useEffect, useState, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import comps from "../comps";
import functionParser from "./functions/functionParser";

export const CompContext = createContext(null);
//import "../scss/Block.scss";

import "../block.css";

import {
  AiFillEdit,
  AiOutlineBank,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileAdd,
  AiOutlinePlus,
} from "react-icons/ai";

function FComp({ comp, _props, Data, setData }: any) {
  return React.createElement(comps[comp.type], {
    ...comp,
    props: {
      ..._props,
      value: Data[comp.id],
      change: (val) => {
        setData((e) => ({ ...e, [comp.id]: val }));
      },
    },
  });
}

export default function ToComp({
  schema,
  states,
  dataChange,
  type,
  values,
  head,
  disc,
}: React.PropsWithChildren<{
  head: string;
  disc: string;
  schema: [
    { id: string; type: string; load?: string; contition?: string; props: any }
  ];
  states?: {};
  dataChange: [{ id; func }];
  type: "simple" | "complex";
  values: any;
}>) {
  let isComplex = type == "complex";
  const [Data, setData] = useState(values ? values : isComplex ? [] : {});
  const [CusState, setCusState] = useState(states);

  useEffect(() => {}, [0]);

  ////trigger action when data Changes
  if (dataChange) {
    ///only if dataChange have
    for (const _ of dataChange) {
      useEffect(() => {
        let _val = Data[_.id];
        functionParser({
          func:
            `let $val=${typeof _val == "string" ? `"${_val}"` : _val}\n` +
            _.func,
          data: { Data, setData, CusState, setCusState },
        });
      }, [Data[_.id]]);
    }
  }

  return (
    <div className="text-left shadow-lg text-gray-900 m-5 p-6">
      <h1 className="text-5xl my-2 text-left font-thin ">{head}</h1>
      <p className="text-zinc-400">{disc}</p>
      <div className="p-5">
        {isComplex ? (
          <ComplexBlock
            schema={schema}
            Data={Data}
            setData={setData}
            CusState={CusState}
            setCusState={setCusState}
          />
        ) : (
          <SimpleBlock
            schema={schema}
            Data={Data}
            setData={setData}
            CusState={CusState}
            setCusState={setCusState}
          />
        )}
      </div>
    </div>
  );
}

function SimpleBlock({ schema, Data, setData, CusState, setCusState }) {
  return (
    <>
      {schema && (
        <div>
          {schema.map((comp) => {
            const [_props, set_props] = useState(comp.props);
            let data = {
              _props,
              set_props,
              Data,
              setData,
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
              <div key={comp.id}>
                {comp.contition ? (
                  Contitional() && (
                    <FComp
                      comp={comp}
                      Data={Data}
                      setData={setData}
                      _props={_props}
                    />
                  )
                ) : (
                  <FComp
                    comp={comp}
                    Data={Data}
                    setData={setData}
                    _props={_props}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
function ComplexBlock({ schema, Data, setData, CusState, setCusState }) {
  const [OpenDia, setOpenDia] = useState(false);
  const [EditKey, setEditKey] = useState(false);
  function AdderDia() {
    let id = uuidv4();
    let _ind = Data.findIndex((e) => e.id == EditKey);
    const [_Data, set_Data] = useState(EditKey ? Data[_ind] : { id });

    return (
      <>
        {OpenDia && (
          <div className="fixed w-full h-full left-0 top-0 bg-gray-400 backdrop-blur  bg-opacity-25 ">
            <div className="bg-white text-left shadow-lg text-gray-900 m-14 p-6">
              <div className="flex">
                <div>{EditKey ? `Edit ${EditKey}` : "Add New"}</div>
                <button
                  onClick={() => {
                    setEditKey(false);
                    setOpenDia(false);
                  }}
                  className="ml-auto p-2 text-red-500 bg-red-50 hover:bg-red-100"
                >
                  <AiOutlineClose className="w-4 h-4 " />
                </button>
              </div>

              <div>
                <div>
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
                      <div key={comp.id}>
                        {comp.contition ? (
                          Contitional() && (
                            <FComp
                              comp={comp}
                              Data={_Data}
                              setData={set_Data}
                              _props={_props}
                            />
                          )
                        ) : (
                          <FComp
                            comp={comp}
                            Data={_Data}
                            setData={set_Data}
                            _props={_props}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <button
                  className="bg-blue-700 px-4 py-2 text-blue-100 rounded-md"
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

  return (
    <div>
      <div className="my-2">
        <button
          className="inline-flex bg-slate-100 px-3 py-1"
          onClick={() => {
            setOpenDia(true);
          }}
        >
          <AiOutlinePlus className="relative top-1 " />
          <span>Add Item</span>
        </button>
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
            <tbody >
              {Data.map((row, i) => {
                return (
                  <tr className="border-t-2" key={i + "row"}>
                    <th className="px-3">
                      <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" />
                    </th>
                    <td className="py-1 px-3">
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
                    </td>
                    
                    {schema.map((e) => (
                      <td key={e.id} className="border-l-2 max-h-52 py-1 px-3 max-w-md">
                        {row[e.id]}
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
