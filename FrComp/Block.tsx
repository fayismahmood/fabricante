import React, { useEffect, useState, createContext,  } from "react";

import functionParser from "./functions/functionParser";

import { Validation } from "./Block/Validation";
//import "../scss/Block.scss";

import "../block.css";

import SimpleBlock from "./Block/SimpleBlock";
import ComplexBlock from "./Block/ComplexBlock";

export default function ToComp({
  schema,
  states,
  dataChange,
  type,
  values,
  head,
  disc,
  validation,
  onChange,
}: React.PropsWithChildren<{
  head: string;
  disc: string;
  schema: [
    {
      id: string;
      type: string;
      load?: string;
      contition?: string;
      props: any;
      validate?: any;
    }
  ];
  states?: {};
  dataChange: [{ id; func }];
  type: "simple" | "complex";
  values: any;
  validation?: boolean;
  onChange?: (e: any) => void;
}>) {
  let isComplex = type == "complex";
  const [Data, setData] = useState(values ? values : isComplex ? [] : {});
  const [CusState, setCusState] = useState(states);

  useEffect(() => {
    if (onChange) {
      onChange({
        Data,
        CusState,
        validation: !isComplex ? Validation(schema, Data) : null,
      });
    }
  }, [Data, CusState]);

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
            validation={validation}
          />
        ) : (
          <SimpleBlock
            schema={schema}
            Data={Data}
            setData={setData}
            CusState={CusState}
            setCusState={setCusState}
            validation={validation}
          />
        )}
      </div>
    </div>
  );
}
