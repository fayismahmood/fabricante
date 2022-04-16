import React,{ useEffect, useState } from "react";
import functionParser from "../functions/functionParser";
import FComp from "./FComp";
import {Validation} from './Validation'

export default function SimpleBlock({
    schema,
    Data,
    setData,
    CusState,
    setCusState,
    validation,
  }) {
    let _val = (e) =>
      validation && Validation(schema, Data) ? Validation(schema, Data)[e] : null;
  
    return (
      <>
        {schema && (
          <div className="flex flex-row flex-wrap">
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
                <React.Fragment key={comp.id}>

                  {comp.contition ? (
                    Contitional() && (
                      <FComp
                        comp={comp}
                        Data={Data}
                        setData={setData}
                        _props={_props}
                        validate={_val(comp.id)}
                      />
                    )
                  ) : (
                    <FComp
                      comp={comp}
                      Data={Data}
                      setData={setData}
                      _props={_props}
                      validate={_val(comp.id)}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </>
    );
  }