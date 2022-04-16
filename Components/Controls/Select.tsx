import React, { useState } from "react";
import { AiFillExclamationCircle, AiOutlineDown } from "react-icons/ai";

export default function ({
  key,
  props,
  validate,
}: {
  key: any;
  props: any;
  validate: any;
}) {
  const [OpenDown, setOpenDown] = useState(false);

  function Down() {
    return (
      <div className="absolute z-50 shadow transition-transform translate-y-0 bg-white w-full">
        {props.options &&
          props.options.map(({ text, value }: { text: any; value: any }) => (
            <div
              onClick={() => {
                props.change(value);
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
    <div className={`relative  m-3 ${props.size ? props.size : "w-full"}`}>
      <label className="block text-left text-xs text-gray-600">
        {props.label}
      </label>
      <div
        onClick={() => {
          setOpenDown(!OpenDown);
        }}
        className={`rounded  flex px-4 py-1 w-full border-2 outline-none ${
          OpenDown && "border-blue-900"
        }`}
        key={props.key}
        onInput={(e: any) => {
          props.change(e.target.value);
        }}
      >
        <div>
          {props.options.some((_e) => _e.value == props.value) ? (
            props.options.find((e) => e.value == props.value).text
          ) : (
            <div className="text-xs text-gray-600">Not Selected</div>
          )}
        </div>
        <button className="ml-auto text-indigo-900 rounded-lg ">
          <AiOutlineDown className="w-4 h-4" />
        </button>
      </div>
      {OpenDown && <Down />}
      {validate && (
        <div className="mt-1">
          {validate.map((e, i) => (
            <div key={i + "vali"} className="text-xs text-red-900 inline-flex">
              <AiFillExclamationCircle className="w-4 h-4 relative mr-1" />
              <span>{e}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
