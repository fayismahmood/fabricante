import React, { useContext, useEffect, useState } from "react";
import functionParser from "../FrComp/functions/functionParser";

import "../block.css";
import {
  AiFillExclamationCircle,
  AiOutlineArrowDown,
  AiOutlineDown,
  AiOutlineExclamationCircle,
  AiOutlineLeft,
} from "react-icons/ai";
import Select from "./Controls/Select";

let controls: any = {
  Text: ({ key, props, validate }: { key: any; props: any; validate: any }) => {
    return (
      <div className={`m-3 ${props.size?props.size:"w-full"}`}>
        <label className="block  text-left text-xs text-gray-600">
          {props.label}
        </label>
        <input
          className={`${
            validate && "border-red-200"
          } rounded block px-4 py-1 w-full border-2 outline-none focus:border-blue-900`}
          key={props.key}
          value={props.value || ""}
          onInput={(e: any) => {
            props.change(e.target.value);
          }}
        />
        {validate && (
          <div className="mt-1">
            {validate.map((e, i) => (
              <div
                key={i + "vali"}
                className="text-xs text-red-900 inline-flex"
              >
                <AiFillExclamationCircle className="w-4 h-4 relative mr-1" />
                <span>{e}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  TextArea: ({ key, props, validate }: { key: any; props: any; validate: any }) => {
    return (
      <div className={`m-3 ${props.size?props.size:"w-full"}`}>
        <label className=" block text-left text-xs text-gray-600">
          {props.label}
        </label>
        <textarea
          className="rounded block px-4 py-2 w-full border-2 outline-none focus:border-blue-900"
          key={props.key}
          value={props.value}
          onInput={(e: any) => {
            props.change(e.target.value);
          }}
        />
        {validate && (
          <div className="mt-1">
            {validate.map((e, i) => (
              <div
                key={i + "vali"}
                className="text-xs text-red-900 inline-flex"
              >
                <AiFillExclamationCircle className="w-4 h-4 relative mr-1" />
                <span>{e}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  Select:Select,

};
export default controls;
