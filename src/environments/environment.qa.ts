import { defaultEnvironment } from "./environment.default";

export const environment = {
  ...defaultEnvironment,
  production: true,
  apiUrl: "http://165.22.223.35:9000/api",
};
