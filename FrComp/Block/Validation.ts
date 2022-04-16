import validate from "validate.js";

export let Validation = (schema, Data) => {
    let Contrains = schema
      ? schema.reduce((a, v) => ({ ...a, [v.id]: v.validate }), {})
      : {};
  
    return validate(Data, Contrains);
  };