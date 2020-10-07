import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes, StorageKeys } from "@core/enums";
import { AuthService, SnackBarService, StorageService } from "@core/services";
import { PermissionsService } from "@core/services/permissions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { SidebarService } from "@shared/sidebar";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import {
  AuthActionTypes,
  GetProfileAction,
  GetProfileFailureAction,
  GetProfileSuccessAction,
  LogIn,
  LogInFailure,
  LogInSuccess,
  LogOutSuccess,
  UpdatePasswordAction,
  UpdatePasswordFailureAction,
  UpdatePasswordSuccessAction,
  UpdateProfileAction,
  UpdateProfileFailureAction,
  UpdateProfileSuccessAction,
} from "../actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService,
    private storage: StorageService,
    private permissionService: PermissionsService,
    private sidebarService: SidebarService
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload) => {
      return this.authService.login(payload).pipe(
        map((response) => {
          return new LogInSuccess(response);
        }),
        catchError((error) => {
          return of(new LogInFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((response) => {
      // this.redirectOnLogin();
      this.redirectToDashboard();
      this.snackbar.open(
        this.translate.instant("login_success_msg"),
        "green-snackbar"
      );
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    map((action: LogIn) => action.payload),
    switchMap((payload) => {
      return this.authService.logout().pipe(
        map((response) => {
          return new LogOutSuccess(response);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogOutSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT_SUCCESS),
    tap((response) => {
      this.router.navigateByUrl(AppRoutes.LOGIN_PAGE);
      this.snackbar.open(
        this.translate.instant("logout_success_msg"),
        "green-snackbar"
      );
    })
  );

  @Effect() getProfile$ = this.actions.pipe(
    ofType<GetProfileAction>(AuthActionTypes.GET_PROFILE),
    mergeMap((data) =>
      this.authService.viewProfile().pipe(
        map((profile) => {
          return new GetProfileSuccessAction(profile);
        }),
        catchError((error) => of(new GetProfileFailureAction(error)))
      )
    )
  );

  @Effect() updateProfile$ = this.actions.pipe(
    ofType<UpdateProfileAction>(AuthActionTypes.UPDATE_PROFILE),
    mergeMap((data) =>
      this.authService.updateProfile(data.payload).pipe(
        map(() => new UpdateProfileSuccessAction(data.payload)),
        catchError((error) => of(new UpdateProfileFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateProfileSuccess$ = this.actions.pipe(
    ofType<UpdateProfileSuccessAction>(AuthActionTypes.UPDATE_PROFILE_SUCCESS),
    tap((response: any) => {
      const infoMessage = this.translate.instant("item_updated_message");
      this.router.navigateByUrl(AppRoutes.PROFILE_PAGE);
      this.snackbar.open(infoMessage, "success");
    })
  );

  @Effect() updatePasswod$ = this.actions.pipe(
    ofType<UpdatePasswordAction>(AuthActionTypes.UPDATE_PASSWORD),
    mergeMap((data) =>
      this.authService.updatePassword(data.payload).pipe(
        map(() => new UpdatePasswordSuccessAction(data.payload)),
        catchError((error) => of(new UpdatePasswordFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updatePasswordSuccess$ = this.actions.pipe(
    ofType<UpdatePasswordSuccessAction>(
      AuthActionTypes.UPDATE_PASSWORD_SUCCESS
    ),
    tap((response: any) => {
      const infoMessage = this.translate.instant("item_updated_message");
      this.router.navigateByUrl(AppRoutes.PROFILE_PAGE);
      this.snackbar.open(infoMessage, "success");
    })
  );

  redirectOnLogin() {
    const routesArray = [];
    this.sidebarService.menuLists.forEach((menuItem) => {
      const checkAuthorization$ = this.permissionService.checkAuthorization(
        menuItem.has_access_module
      );
      checkAuthorization$.subscribe((bool) => {
        if (bool) {
          routesArray.push(menuItem.redirectTo);
        }
      });
    });
    this.storage.set(StorageKeys.DEFAULT_ROUTE, routesArray[0]);
    this.router.navigateByUrl(routesArray[0]);
  }

  redirectToDashboard() {
    this.router.navigateByUrl(AppRoutes.DASHBOARD_PAGE);
  }
}
