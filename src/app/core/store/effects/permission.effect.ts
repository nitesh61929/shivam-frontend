import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackBarService } from "@core/services";
import { PermissionsService } from "@core/services/permissions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import {
  LoadPermissionAction,
  LoadPermissionFailureAction,
  LoadPermissionSuccessAction,
  PermissionActionTypes,
} from "../actions";

@Injectable()
export class PermissionEffects {
  constructor(
    private actions$: Actions,
    private permisionsService: PermissionsService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() loadPermission$ = this.actions$.pipe(
    ofType<LoadPermissionAction>(PermissionActionTypes.LOAD_PERMISSION),
    mergeMap((d) =>
      this.permisionsService.getPermissions().pipe(
        map((data) => {
          return new LoadPermissionSuccessAction(data);
        }),
        catchError((error) => of(new LoadPermissionFailureAction(error)))
      )
    )
  );
}
