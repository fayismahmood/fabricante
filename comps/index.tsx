import React, { useContext, useEffect, useState } from "react";
import functionParser from "../FrComp/functions/functionParser";

import "../block.css";
import {
  AiOutlineArrowDown,
  AiOutlineDown,
  AiOutlineLeft,
} from "react-icons/ai";

let controls: any = {
  Text: ({ key, props }: { key: any; props: any }) => {
    return (
      <div className="my-3">
        <label className="block  text-left text-xs text-gray-600">
          {props.label}
        </label>
        <input
          className="rounded block px-4 py-1 w-full border-2 outline-none focus:border-blue-900"
          key={props.key}
          value={props.value||""}
          onInput={(e: any) => {
            props.change(e.target.value);
          }}
        />
      </div>
    );
  },
  TextArea: ({ key, props }: { key: any; props: any }) => {
    return (
      <div className="my-3">
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
      </div>
    );
  },
  Select: ({ key, props }: { key: any; props: any }) => {
    const [OpenDown, setOpenDown] = useState(false);
    
    function Down() {
      return (
        <div className="absolute shadow transition-transform translate-y-0 bg-white w-full">
          {props.options &&
            props.options.map(({ text, value }: { text: any; value: any }) => (
              <div
                onClick={() => {
                  props.change(value)
                  setOpenDown(false);
                }}
                className="hover:bg-gray-50 cursor-pointer border-t-2 py-1 border-gray-50 px-4"
                key={value + "key"}
              
              >
                {text}
              </div>
            ))}
        </div>
      );
    }
    return (
      <div className="relative">
        <label className="block text-left text-xs text-gray-600">
          {props.label}
        </label>
        <div
          onClick={() => {
            setOpenDown(!OpenDown);
          }}
          className={`rounded  flex px-4 py-1 w-full border-2 outline-none ${OpenDown&&"border-blue-900"}`}
          key={props.key}
          onInput={(e: any) => {
            props.change(e.target.value);
          }}
        >
          <div>
            {props.value
              ? props.options.find((e) => e.value == props.value).text
              : "Select a New Value"}
          </div>
          <button className="ml-auto text-indigo-900 rounded-lg ">
            <AiOutlineDown className="w-4 h-4" />
          </button>
        </div>
        {OpenDown && <Down />}
      </div>
    );
  },
};
export default controls;
