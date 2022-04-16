import React from "react";
import comps from "../../Components";

export default function FComp({ comp, _props, Data, setData, validate }: any) {
    return React.createElement(comps[comp.type], {
      ...comp,
      validate,
      props: {
        ..._props,
        value: Data[comp.id],
        change: (val) => {
          setData((e) => ({ ...e, [comp.id]: val }));
        },
      },
    });
  }