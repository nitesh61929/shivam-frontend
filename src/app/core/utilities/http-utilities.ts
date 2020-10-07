import { IParameter } from "@core/interfaces";

export function setParameters(param: IParameter) {
  Object.entries(param).forEach(([key, value]) => {
    if (key === "page") {
      param[key] = value + 1;
    }
    if (value === "" || value === null) {
      delete param[key];
    }
  });

  const stringParams = convertPropertiesToString(param);
  return stringParams;
}

function convertPropertiesToString(obj: any) {
  Object.entries(obj).forEach(([key, value]) => {
    obj[key] = value.toString();
  });
  return obj;
}
