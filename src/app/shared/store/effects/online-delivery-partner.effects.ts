import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "@core/enums";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { IOnlineDeliveryPartner } from "../../interfaces/online-delivery-partner";
import { OnlineDeliveryPartnerService } from "../../services/online-delivery-partner/online-delivery-partner.service";
import {
  AddOnlineDeliveryPartnerAction,
  AddOnlineDeliveryPartnerFailureAction,
  AddOnlineDeliveryPartnerSuccessAction,
  EditOnlineDeliveryPartnerAction,
  EditOnlineDeliveryPartnerFailureAction,
  EditOnlineDeliveryPartnerSuccessAction,
  GetOnlineDeliveryPartnerAction,
  GetOnlineDeliveryPartnerFailureAction,
  GetOnlineDeliveryPartnerSuccessAction,
  LoadOnlineDeliveryPartnerAction,
  LoadOnlineDeliveryPartnerFailureAction,
  LoadOnlineDeliveryPartnerSuccessAction,
  OnlineDeliveryPartnerActionTypes,
} from "../actions";

@Injectable()
export class OnlineDeliveryPartnerEffects {
  constructor(
    private actions$: Actions,
    private onlineDeliveryPartnerService: OnlineDeliveryPartnerService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() addOnlineDeliveryPartner$ = this.actions$.pipe(
    ofType<AddOnlineDeliveryPartnerAction>(
      OnlineDeliveryPartnerActionTypes.ADD_ONLINE_DELIVERY_PARTNER
    ),
    mergeMap((data) =>
      this.onlineDeliveryPartnerService
        .createOnlineDeliveryPartner(data.payload)
        .pipe(
          map(() => new AddOnlineDeliveryPartnerSuccessAction(data.payload)),
          catchError((error) =>
            of(new AddOnlineDeliveryPartnerFailureAction(error))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  addOnlineDeliveryPartnerSuccess$ = this.actions$.pipe(
    ofType<AddOnlineDeliveryPartnerSuccessAction>(
      OnlineDeliveryPartnerActionTypes.ADD_ONLINE_DELIVERY_PARTNER_SUCCESS
    ),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect() editOnlineDeliveryPartner$ = this.actions$.pipe(
    ofType<EditOnlineDeliveryPartnerAction>(
      OnlineDeliveryPartnerActionTypes.EDIT_ONLINE_DELIVERY_PARTNER
    ),
    mergeMap((data) =>
      this.onlineDeliveryPartnerService
        .updateOnlineDeliveryPartner(data.onlineDeliveryPartnerId, data.payload)
        .pipe(
          map(() => new EditOnlineDeliveryPartnerSuccessAction(data.payload)),
          catchError((error) =>
            of(new EditOnlineDeliveryPartnerFailureAction(error))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  editOnlineDeliveryPartnerSuccess$ = this.actions$.pipe(
    ofType<EditOnlineDeliveryPartnerSuccessAction>(
      OnlineDeliveryPartnerActionTypes.EDIT_ONLINE_DELIVERY_PARTNER_SUCCESS
    ),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect() getOnlineDeliveryPartner$ = this.actions$.pipe(
    ofType<GetOnlineDeliveryPartnerAction>(
      OnlineDeliveryPartnerActionTypes.GET_ONLINE_DELIVERY_PARTNER
    ),
    mergeMap((data) =>
      this.onlineDeliveryPartnerService
        .getOnlineDeliveryPartnerDetail(data.onlineDeliveryPartnerId)
        .pipe(
          map((onlineDeliveryPartner) => {
            return new GetOnlineDeliveryPartnerSuccessAction(
              onlineDeliveryPartner
            );
          }),
          catchError((error) =>
            of(new GetOnlineDeliveryPartnerFailureAction(error))
          )
        )
    )
  );

  @Effect() loadOnlineDeliveryPartner$ = this.actions$.pipe(
    ofType<LoadOnlineDeliveryPartnerAction>(
      OnlineDeliveryPartnerActionTypes.LOAD_ONLINE_DELIVERY_PARTNER
    ),
    mergeMap((d) =>
      this.onlineDeliveryPartnerService.getOnlineDeliveryPartners(d.param).pipe(
        map((data) => {
          return new LoadOnlineDeliveryPartnerSuccessAction(data);
        }),
        catchError((error) =>
          of(new LoadOnlineDeliveryPartnerFailureAction(error))
        )
      )
    )
  );

  onSuccess(onlineDeliveryPartnerResponse: IOnlineDeliveryPartner) {
    const infoMessage = onlineDeliveryPartnerResponse.id
      ? this.translate.instant("item_updated_message")
      : this.translate.instant("item_added_message");
    // const infoMessage = this.translate.instant("item_added_message");
    this.router.navigateByUrl(AppRoutes.ONLINE_DELIVERY_PARTNERS_PAGE);
    this.snackbar.open(infoMessage, "success");
  }
}
