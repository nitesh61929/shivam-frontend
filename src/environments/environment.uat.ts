import { defaultEnvironment } from "./environment.default";

export const environment = {
  ...defaultEnvironment,
  production: true,
  apiUrl: "http://uat.eshivamcement.com:9001/api",
};
