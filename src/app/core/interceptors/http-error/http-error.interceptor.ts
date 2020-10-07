import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "@core/enums";
import { SnackBarService, StorageService } from "@core/services";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: SnackBarService,
    private router: Router,
    private storage: StorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event) => {
          // success code
        },
        (error) => {
          if (error.error.code === 401) {
            this.snackBar.open(error.error.message, "red-snackbar");
            this.storage.clear();
            this.router.navigateByUrl(AppRoutes.LOGIN_PAGE);
          }
          if (error.error.code === 422) {
            this.snackBar.open(error.error.message, "danger");
          }
          if (error.error.code === 400) {
            this.snackBar.open(error.error.message, "warning");
          }
          if (
            error.error.code === 401 &&
            error.error.message.toLowerCase() === "unauthenticated."
          ) {
            this.snackBar.open(
              "Either token has been expired or permission has been updated. Please login again.",
              "red-snackbar"
            );
            this.storage.clear();
            this.router.navigateByUrl(AppRoutes.LOGIN_PAGE);
          }
          if (error.error.code === 500) {
            this.router.navigateByUrl(AppRoutes.SERVER_ERROR_PAGE);
          }
          if (error.error.code === 403) {
            this.router.navigateByUrl(AppRoutes.NO_PERMISSION_PAGE);
          }
          if (error.error.code === 404) {
            this.router.navigateByUrl(AppRoutes.NOT_FOUND_PAGE);
          }
          if (!error.error.code) {
            this.router.navigateByUrl(AppRoutes.NO_CONNECTION_PAGE);
          }
        }
      )
    );
  }
}
