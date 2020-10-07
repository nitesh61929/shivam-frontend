import { Action } from "@ngrx/store";

export enum ProvincesWithDistrictsActionTypes {
  LOAD_PROVINCES_DISTRICTS = "[PROVINCES_DISTRICTS] Load Provinces with districts",
  LOAD_PROVINCES_DISTRICTS_SUCCESS = "[PROVINCES_DISTRICTS] Load Provinces with districts Success",
  LOAD_PROVINCES_DISTRICTS_FAILURE = "[PROVINCES_DISTRICTS] Load Provinces with districts Failure",
}

export class LoadProvincesDistrictsAction implements Action {
  readonly type = ProvincesWithDistrictsActionTypes.LOAD_PROVINCES_DISTRICTS;
  constructor() {}
}

export class LoadProvincesDistrictsSuccessAction implements Action {
  readonly type =
    ProvincesWithDistrictsActionTypes.LOAD_PROVINCES_DISTRICTS_SUCCESS;

  constructor(public listResponse: any) {}
}

export class LoadProvincesDistrictsFailureAction implements Action {
  readonly type =
    ProvincesWithDistrictsActionTypes.LOAD_PROVINCES_DISTRICTS_FAILURE;

  constructor(public payload: string) {}
}

export type ProvincesWithDistrictsActions =
  | LoadProvincesDistrictsAction
  | LoadProvincesDistrictsSuccessAction
  | LoadProvincesDistrictsFailureAction;
