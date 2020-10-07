import { defaultEnvironment } from "./environment.default";

export const environment = {
  ...defaultEnvironment,
  production: true,
  apiUrl: "https://eshivamcement.com:9000/api",
};
