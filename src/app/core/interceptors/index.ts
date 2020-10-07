import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BaseUrlInterceptor } from "./base-url";
import { HttpErrorInterceptor } from "./http-error";
import { LoaderInterceptor } from "./loader/loader.interceptor";
import { TokenInterceptor } from "./token";

export * from "./base-url";
export * from "./http-error";
export * from "./token";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
];
