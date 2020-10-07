import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "@core/enums";
import { IUser } from "@core/interfaces";
import { SnackBarService, UserService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import {
  EditUserAction,
  EditUserFailureAction,
  EditUserSuccessAction,
  GetDealerAllocationsAction,
  GetDealerAllocationsFailureAction,
  GetDealerAllocationsSuccessAction,
  GetUserAction,
  GetUserFailureAction,
  GetUserSuccessAction,
  LoadUserAction,
  LoadUserFailureAction,
  LoadUserSuccessAction,
  ToggleUserAction,
  ToggleUserFailureAction,
  ToggleUserSuccessAction,
  UserActionTypes,
} from "../actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() loadUser$ = this.actions$.pipe(
    ofType<LoadUserAction>(UserActionTypes.LOAD_USER),
    mergeMap((d) =>
      this.userService.getUsers(d.param).pipe(
        map((data) => {
          return new LoadUserSuccessAction(data);
        }),
        catchError((error) => of(new LoadUserFailureAction(error)))
      )
    )
  );

  @Effect() toggleUser$ = this.actions$.pipe(
    ofType<ToggleUserAction>(UserActionTypes.TOGGLE_USER),
    mergeMap((d) =>
      this.userService.activateDeactivateUser(d.id, d.param).pipe(
        map((data) => {
          return new ToggleUserSuccessAction(data);
        }),
        catchError((error) => of(new ToggleUserFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  toggleUserSuccess$ = this.actions$.pipe(
    ofType(UserActionTypes.TOGGLE_USER_SUCCESS),
    tap((response: any) => {
      this.onToggleUserSuccess(response.payload);
    })
  );

  @Effect() getUser$ = this.actions$.pipe(
    ofType<GetUserAction>(UserActionTypes.GET_USER),
    mergeMap((data) =>
      this.userService.getUserDetail(data.userId).pipe(
        map((user) => {
          return new GetUserSuccessAction(user);
        }),
        catchError((error) => of(new GetUserFailureAction(error)))
      )
    )
  );

  @Effect() getDealerAllocations$ = this.actions$.pipe(
    ofType<GetDealerAllocationsAction>(UserActionTypes.GET_DEALER_ALLOCATIONS),
    mergeMap((data) =>
      this.userService.getDealerAllocations(data.dealerId).pipe(
        map((user) => {
          return new GetDealerAllocationsSuccessAction(user);
        }),
        catchError((error) => of(new GetDealerAllocationsFailureAction(error)))
      )
    )
  );

  @Effect() editUser$ = this.actions$.pipe(
    ofType<EditUserAction>(UserActionTypes.EDIT_USER),
    mergeMap((data) =>
      this.userService.updateUser(data.userId, data.payload).pipe(
        map(() => new EditUserSuccessAction(data.payload)),
        catchError((error) => of(new EditUserFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  editUserSuccess$ = this.actions$.pipe(
    ofType<EditUserSuccessAction>(UserActionTypes.EDIT_USER_SUCCESS),
    tap((response: any) => {
      this.onConsumerEditSuccess(response.payload);
    })
  );

  onToggleUserSuccess(response: any) {
    const infoMessage = this.translate.instant("status_updated_success");
    this.snackbar.open(infoMessage, "success");
  }

  onConsumerEditSuccess(userResponse: IUser) {
    const infoMessage = this.translate.instant("item_updated_message");
    this.router.navigateByUrl(AppRoutes.CONSUMERS_PAGE);
    this.snackbar.open(infoMessage, "success");
  }
}
