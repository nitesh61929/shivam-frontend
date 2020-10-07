import { IParameter } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";
import { IProduct } from "../../interfaces";

export enum ProductActionTypes {
  LOAD_PRODUCTS = "[PRODUCTS] Load Products",
  LOAD_PRODUCTS_SUCCESS = "[PRODUCTS] Load Products Success",
  LOAD_PRODUCTS_FAILURE = "[PRODUCTS] Load Products Failure",
  ADD_PRODUCT = "[PRODUCTS] Add Product",
  ADD_PRODUCT_SUCCESS = "[PRODUCTS] Add Product Success",
  ADD_PRODUCT_FAILURE = "[PRODUCTS] Add Product Failure",
  DELETE_PRODUCT = "[PRODUCTS] Delete Product",
  DELETE_PRODUCT_SUCCESS = "[PRODUCTS] Delete Product Success",
  DELETE_PRODUCT_FAILURE = "[PRODUCTS] Delete Product Failure",
  GET_PRODUCT = "[PRODUCTs] Get Product",
  GET_PRODUCT_SUCCESS = "[PRODUCTS] Get Product Success",
  GET_PRODUCT_FAILURE = "[PRODUCTS] Get Product Failure",
}

export class LoadProductsAction implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCTS;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadProductsSuccessAction implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadProductsFailureAction implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCTS_FAILURE;

  constructor(public payload: string) {}
}

export class AddProductAction implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCT;

  constructor(public payload: any) {}
}
export class AddProductSuccessAction implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCT_SUCCESS;

  constructor(public payload: IProduct) {}
}
export class AddProductFailureAction implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCT_FAILURE;

  constructor(public payload: Error) {}
}

export class DeleteProductAction implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT;

  constructor(public productId: number) {}
}

export class DeleteProductSuccessAction implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT_SUCCESS;

  constructor(public productId: number) {}
}

export class DeleteProductFailureAction implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT_FAILURE;

  constructor(public payload: string) {}
}

export class GetProductAction implements Action {
  readonly type = ProductActionTypes.GET_PRODUCT;

  constructor(public productId: number) {}
}

export class GetProductSuccessAction implements Action {
  readonly type = ProductActionTypes.GET_PRODUCT_SUCCESS;

  constructor(public product: any) {}
}

export class GetProductFailureAction implements Action {
  readonly type = ProductActionTypes.GET_PRODUCT_FAILURE;

  constructor(public payload: any) {}
}

export type ProductAction =
  | LoadProductsAction
  | LoadProductsSuccessAction
  | LoadProductsFailureAction
  | AddProductAction
  | AddProductSuccessAction
  | AddProductFailureAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | DeleteProductFailureAction
  | GetProductAction
  | GetProductSuccessAction
  | GetProductFailureAction;
