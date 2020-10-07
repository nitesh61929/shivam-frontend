import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { IConfiguration } from "@shared/interfaces";
import { ConfigurationService } from "@shared/services";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import {
  ConfigurationActionTypes,
  GetConfigurationAction,
  GetConfigurationFailureAction,
  GetConfigurationSuccessAction,
  LoadConfigurationsAction,
  LoadConfigurationsFailureAction,
  LoadConfigurationsSuccessAction,
  UpdateConfigurationAction,
  UpdateConfigurationFailureAction,
  UpdateConfigurationSuccessAction,
} from "../actions";

@Injectable()
export class ConfigurationEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService,
    private configurationService: ConfigurationService
  ) {}

  @Effect() loadConfigurations$ = this.actions$.pipe(
    ofType<LoadConfigurationsAction>(
      ConfigurationActionTypes.LOAD_CONFIGURATIONS
    ),
    mergeMap((d) =>
      this.configurationService.getConfigurationList(d.param).pipe(
        map((data) => {
          return new LoadConfigurationsSuccessAction(data);
        }),
        catchError((error) => of(new LoadConfigurationsFailureAction(error)))
      )
    )
  );

  @Effect() updateConfiguration$ = this.actions$.pipe(
    ofType<UpdateConfigurationAction>(
      ConfigurationActionTypes.UPDATE_CONFIGURATION
    ),
    mergeMap((data) =>
      this.configurationService.updateConfiguration(data.payload).pipe(
        map(() => new UpdateConfigurationSuccessAction(data.payload)),
        catchError((error) => of(new UpdateConfigurationFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateConfigurationSuccess$ = this.actions$.pipe(
    ofType(ConfigurationActionTypes.UPDATE_CONFIGURATION_SUCCESS),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect() getConfiguration$ = this.actions$.pipe(
    ofType<GetConfigurationAction>(ConfigurationActionTypes.GET_CONFIGURATION),
    mergeMap((data) =>
      this.configurationService.getConfigurationDetail(data.id).pipe(
        map((deliveryLocation) => {
          return new GetConfigurationSuccessAction(deliveryLocation);
        }),
        catchError((error) => of(new GetConfigurationFailureAction(error)))
      )
    )
  );

  onSuccess(configuration: IConfiguration) {
    const infoMessage = configuration.id
      ? this.translate.instant("item_updated_message")
      : this.translate.instant("item_added_message");
    // this.router.navigateByUrl(AppRoutes.DELIVERY_LOCATION_PAGE);
    this.snackbar.open(infoMessage, "success");
  }
}
