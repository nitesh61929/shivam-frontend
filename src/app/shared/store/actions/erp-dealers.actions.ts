import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum ErpDealersActionTypes {
  LOAD_ERP_DEALERS = "[ERP_DEALERS] Load Erp Dealers",
  LOAD_ERP_DEALERS_SUCCESS = "[ERP_DEALERS] Load Erp Dealers Success",
  LOAD_ERP_DEALERS_FAILURE = "[ERP_DEALERS] Load Erp Dealers Failure",
  LOAD_ERP_DATA = "[ERP_DEALERS] Load Erp Data",
  LOAD_ERP_DATA_SUCCESS = "[ERP_DEALERS] Load Erp Data Success",
  LOAD_ERP_DATA_FAILURE = "[ERP_DEALERS] Load Erp Data Failure",
}

export class LoadErpDealersAction implements Action {
  readonly type = ErpDealersActionTypes.LOAD_ERP_DEALERS;

  constructor(public param: any) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadErpDealersSuccessAction implements Action {
  readonly type = ErpDealersActionTypes.LOAD_ERP_DEALERS_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadErpDealersFailureAction implements Action {
  readonly type = ErpDealersActionTypes.LOAD_ERP_DEALERS_FAILURE;

  constructor(public payload: string) {}
}

export class LoadErpDataAction implements Action {
  readonly type = ErpDealersActionTypes.LOAD_ERP_DATA;

  constructor(public param: any) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadErpDataSuccessAction implements Action {
  readonly type = ErpDealersActionTypes.LOAD_ERP_DATA_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadErpDataFailureAction implements Action {
  readonly type = ErpDealersActionTypes.LOAD_ERP_DATA_FAILURE;

  constructor(public payload: string) {}
}

export type ErpDealersActions =
  | LoadErpDealersAction
  | LoadErpDealersSuccessAction
  | LoadErpDealersFailureAction
  | LoadErpDataAction
  | LoadErpDataSuccessAction
  | LoadErpDataFailureAction;
