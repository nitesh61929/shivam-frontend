import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { IPages } from "@shared/interfaces";
import { PagesService } from "@shared/services";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import {
  GetPagesAction,
  GetPagesFailureAction,
  GetPagesSuccessAction,
  LoadPagesAction,
  LoadPagesFailureAction,
  LoadPagesSuccessAction,
  PagesActionTypes,
  UpdatePagesAction,
  UpdatePagesFailureAction,
  UpdatePagesSuccessAction,
} from "../actions";

@Injectable()
export class PagesEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService,
    private configurationService: PagesService
  ) {}

  @Effect() loadPagess$ = this.actions$.pipe(
    ofType<LoadPagesAction>(PagesActionTypes.LOAD_PAGES),
    mergeMap((d) =>
      this.configurationService.getPagesList(d.param).pipe(
        map((data) => {
          return new LoadPagesSuccessAction(data);
        }),
        catchError((error) => of(new LoadPagesFailureAction(error)))
      )
    )
  );

  @Effect() updatePages$ = this.actions$.pipe(
    ofType<UpdatePagesAction>(PagesActionTypes.UPDATE_PAGES),
    mergeMap((data) =>
      this.configurationService.updatePages(data.payload).pipe(
        map(() => new UpdatePagesSuccessAction(data.payload)),
        catchError((error) => of(new UpdatePagesFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updatePagesSuccess$ = this.actions$.pipe(
    ofType(PagesActionTypes.UPDATE_PAGES_SUCCESS),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect() getPages$ = this.actions$.pipe(
    ofType<GetPagesAction>(PagesActionTypes.GET_PAGES),
    mergeMap((data) =>
      this.configurationService.getPagesDetail(data.id).pipe(
        map((deliveryLocation) => {
          return new GetPagesSuccessAction(deliveryLocation);
        }),
        catchError((error) => of(new GetPagesFailureAction(error)))
      )
    )
  );

  onSuccess(configuration: IPages) {
    const infoMessage = configuration.id
      ? this.translate.instant("item_updated_message")
      : this.translate.instant("item_added_message");
    // this.router.navigateByUrl(AppRoutes.DELIVERY_LOCATION_PAGE);
    this.snackbar.open(infoMessage, "success");
  }
}
