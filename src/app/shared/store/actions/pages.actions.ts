import { IParameter } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum PagesActionTypes {
  UPDATE_PAGES = "[PAGES] Update Pages",
  UPDATE_PAGES_SUCCESS = "[PAGES] Update Pages Success",
  UPDATE_PAGES_FAILURE = "[PAGES] Update Pages Failure",
  LOAD_PAGES = "[PAGES] Load Pagess",
  LOAD_PAGES_SUCCESS = "[PAGES] Load Pagess Success",
  LOAD_PAGES_FAILURE = "[PAGES] Load Pagess Failure",
  GET_PAGES = "[PAGES] Get Pages",
  GET_PAGES_SUCCESS = "[PAGES] Get Pages Success",
  GET_PAGES_FAILURE = "[PAGES] Get Pages Failure",
}

export class UpdatePagesAction implements Action {
  readonly type = PagesActionTypes.UPDATE_PAGES;

  constructor(public payload: any) {}
}

export class UpdatePagesSuccessAction implements Action {
  readonly type = PagesActionTypes.UPDATE_PAGES_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdatePagesFailureAction implements Action {
  readonly type = PagesActionTypes.UPDATE_PAGES_FAILURE;

  constructor(public payload: Error) {}
}

export class LoadPagesAction implements Action {
  readonly type = PagesActionTypes.LOAD_PAGES;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadPagesSuccessAction implements Action {
  readonly type = PagesActionTypes.LOAD_PAGES_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadPagesFailureAction implements Action {
  readonly type = PagesActionTypes.LOAD_PAGES_FAILURE;

  constructor(public payload: string) {}
}

export class GetPagesAction implements Action {
  readonly type = PagesActionTypes.GET_PAGES;

  constructor(public id: number) {}
}

export class GetPagesSuccessAction implements Action {
  readonly type = PagesActionTypes.GET_PAGES_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPagesFailureAction implements Action {
  readonly type = PagesActionTypes.GET_PAGES_FAILURE;

  constructor(public payload: any) {}
}

export type PagesActions =
  | UpdatePagesAction
  | UpdatePagesSuccessAction
  | UpdatePagesFailureAction
  | LoadPagesAction
  | LoadPagesSuccessAction
  | LoadPagesFailureAction
  | GetPagesAction
  | GetPagesSuccessAction
  | GetPagesFailureAction;
