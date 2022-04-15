import functions from "../functions";
import parse from "json-templates";
import { useAtom } from "jotai";

function setState(setter) {  
  return (key, value) => {
    setter((e) => ({ ...e, [key]: value }));
  };
}

function getState(getter) {  
  return (key) => {
    return getter[key];
  };
}


export default ({ func, data }) => {
  //console.log(func,data,"t3");
  
  let { _props, set_props,Data, setData, CusState, setCusState } = data;

  let propSetter = setState(set_props);
  let propGetter = getState(_props);

  let dataSetter = setState(setData);
  let dataGetter = getState(Data);

  let CusSetter = setState(setCusState);
  let CusGetter = getState(CusState);
//console.log(Data,"t4");

  return eval(func);;
};
