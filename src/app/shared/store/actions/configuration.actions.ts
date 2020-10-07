import { IParameter } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum ConfigurationActionTypes {
  UPDATE_CONFIGURATION = "[CONFIGURATION] Update Configuration",
  UPDATE_CONFIGURATION_SUCCESS = "[CONFIGURATION] Update Configuration Success",
  UPDATE_CONFIGURATION_FAILURE = "[CONFIGURATION] Update Configuration Failure",
  LOAD_CONFIGURATIONS = "[CONFIGURATION] Load Configurations",
  LOAD_CONFIGURATION_SUCCESS = "[CONFIGURATION] Load Configurations Success",
  LOAD_CONFIGURATION_FAILURE = "[CONFIGURATION] Load Configurations Failure",
  GET_CONFIGURATION = "[CONFIGURATION] Get Configuration",
  GET_CONFIGURATION_SUCCESS = "[CONFIGURATION] Get Configuration Success",
  GET_CONFIGURATION_FAILURE = "[CONFIGURATION] Get Configuration Failure",
}

export class UpdateConfigurationAction implements Action {
  readonly type = ConfigurationActionTypes.UPDATE_CONFIGURATION;

  constructor(public payload: any) {}
}

export class UpdateConfigurationSuccessAction implements Action {
  readonly type = ConfigurationActionTypes.UPDATE_CONFIGURATION_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateConfigurationFailureAction implements Action {
  readonly type = ConfigurationActionTypes.UPDATE_CONFIGURATION_FAILURE;

  constructor(public payload: Error) {}
}

export class LoadConfigurationsAction implements Action {
  readonly type = ConfigurationActionTypes.LOAD_CONFIGURATIONS;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadConfigurationsSuccessAction implements Action {
  readonly type = ConfigurationActionTypes.LOAD_CONFIGURATION_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadConfigurationsFailureAction implements Action {
  readonly type = ConfigurationActionTypes.LOAD_CONFIGURATION_FAILURE;

  constructor(public payload: string) {}
}

export class GetConfigurationAction implements Action {
  readonly type = ConfigurationActionTypes.GET_CONFIGURATION;

  constructor(public id: number) {}
}

export class GetConfigurationSuccessAction implements Action {
  readonly type = ConfigurationActionTypes.GET_CONFIGURATION_SUCCESS;

  constructor(public payload: any) {}
}

export class GetConfigurationFailureAction implements Action {
  readonly type = ConfigurationActionTypes.GET_CONFIGURATION_FAILURE;

  constructor(public payload: any) {}
}

export type ConfigurationActions =
  | UpdateConfigurationAction
  | UpdateConfigurationSuccessAction
  | UpdateConfigurationFailureAction
  | LoadConfigurationsAction
  | LoadConfigurationsSuccessAction
  | LoadConfigurationsFailureAction
  | GetConfigurationAction
  | GetConfigurationSuccessAction
  | GetConfigurationFailureAction;
