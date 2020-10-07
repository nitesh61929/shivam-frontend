import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "@core/enums";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { IDeliveryLocation } from "@shared/interfaces";
import { DeliveryLocationService } from "@shared/services/delivery-location/delivery-location.service";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import {
  DeleteDeliveryLocationAction,
  DeleteDeliveryLocationFailureAction,
  DeleteDeliveryLocationSuccessAction,
  DeliveryLocationActionTypes,
  GetDeliveryLocationAction,
  GetDeliveryLocationFailureAction,
  GetDeliveryLocationSuccessAction,
  LoadDeliveryLocationsAction,
  LoadDeliveryLocationsFailureAction,
  LoadDeliveryLocationsSuccessAction,
  UpdateDeliveryLocationAction,
  UpdateDeliveryLocationFailureAction,
  UpdateDeliveryLocationSuccessAction,
} from "../actions";

@Injectable()
export class DeliveryLocationEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService,
    private deliveryLocationService: DeliveryLocationService
  ) {}

  @Effect() loadDeliveryLocations$ = this.actions$.pipe(
    ofType<LoadDeliveryLocationsAction>(
      DeliveryLocationActionTypes.LOAD_DELIVERY_LOCATIONS
    ),
    mergeMap((d) =>
      this.deliveryLocationService.getDeliveryLocationList(d.param).pipe(
        map((data) => {
          return new LoadDeliveryLocationsSuccessAction(data);
        }),
        catchError((error) => of(new LoadDeliveryLocationsFailureAction(error)))
      )
    )
  );

  @Effect() updateDeliveryLocation$ = this.actions$.pipe(
    ofType<UpdateDeliveryLocationAction>(
      DeliveryLocationActionTypes.UPDATE_DELIVERY_LOCATION
    ),
    mergeMap((data) =>
      this.deliveryLocationService
        .updateDeliveryLocation(data.deliveryLocationPayload)
        .pipe(
          map(
            () =>
              new UpdateDeliveryLocationSuccessAction(
                data.deliveryLocationPayload
              )
          ),
          catchError((error) =>
            of(new UpdateDeliveryLocationFailureAction(error))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateDeliveryLocationSuccess$ = this.actions$.pipe(
    ofType(DeliveryLocationActionTypes.UPDATE_DELIVERY_LOCATION_SUCCESS),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect() getDeliveryLocation$ = this.actions$.pipe(
    ofType<GetDeliveryLocationAction>(
      DeliveryLocationActionTypes.GET_DELIVERY_LOCATION
    ),
    mergeMap((data) =>
      this.deliveryLocationService
        .getDeliveryLocationDetail(data.deliveryLocationId)
        .pipe(
          map((deliveryLocation) => {
            return new GetDeliveryLocationSuccessAction(deliveryLocation);
          }),
          catchError((error) => of(new GetDeliveryLocationFailureAction(error)))
        )
    )
  );

  @Effect() deleteDeliveryLocation$ = this.actions$.pipe(
    ofType<DeleteDeliveryLocationAction>(
      DeliveryLocationActionTypes.DELETE_DELIVERY_LOCATION
    ),
    mergeMap((data) =>
      this.deliveryLocationService
        .deleteDeliveryLocation(data.deliveryLocationId)
        .pipe(
          map(
            () =>
              new DeleteDeliveryLocationSuccessAction(data.deliveryLocationId)
          ),
          catchError((error) =>
            of(new DeleteDeliveryLocationFailureAction(error))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  deleteDeliveryLocationSuccess$ = this.actions$.pipe(
    ofType(DeliveryLocationActionTypes.DELETE_DELIVERY_LOCATION_SUCCESS),
    tap((response) => {
      this.snackbar.open(
        this.translate.instant("item_deleted_message"),
        "success"
      );
    })
  );

  @Effect({ dispatch: false })
  deleteDeliveryLocationError$ = this.actions$.pipe(
    ofType(DeliveryLocationActionTypes.DELETE_DELIVERY_LOCATION_FAILURE),
    tap((err: any) => {
      this.snackbar.open(err.payload.error.message, "danger");
    })
  );

  onSuccess(deliveryLocation: IDeliveryLocation) {
    const infoMessage = deliveryLocation.id
      ? this.translate.instant("item_updated_message")
      : this.translate.instant("item_added_message");
    this.router.navigateByUrl(AppRoutes.DELIVERY_LOCATION_PAGE);
    this.snackbar.open(infoMessage, "success");
  }
}
