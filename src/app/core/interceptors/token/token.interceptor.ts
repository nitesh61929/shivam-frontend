import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageKeys } from "@core/enums";
import { StorageService } from "@core/services";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.get(StorageKeys.TOKEN);

    if (token) {
      // const contentType =
      //   request.body instanceof FormData
      //     ? "multipart/form-data"
      //     : "application/json";
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": contentType,
        },
      });
    }

    return next.handle(request);
  }
}
