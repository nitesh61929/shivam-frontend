import { IPagination } from "@core/interfaces";
import { IProduct } from "../../interfaces";
import { ProductAction, ProductActionTypes } from "../actions";

export interface IProductState {
  list: IProduct[];
  loading: boolean;
  pagination: IPagination | null;
  error: Error;
}

const initialProductState: IProductState = {
  list: [],
  loading: false,
  pagination: null,
  error: undefined,
};

export function ProductsReducer(
  state: IProductState = initialProductState,
  action: ProductAction
) {
  switch (action.type) {
    case ProductActionTypes.LOAD_PRODUCTS:
      return {
        ...state,
        loading: true,
      };

    case ProductActionTypes.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        pagination: action.payload.pagination,
        loading: false,
      };

    case ProductActionTypes.LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case ProductActionTypes.ADD_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case ProductActionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case ProductActionTypes.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ProductActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case ProductActionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((product) => product.id !== action.productId),
        loading: false,
      };

    case ProductActionTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ProductActionTypes.GET_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case ProductActionTypes.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.product.payload,
        loading: false,
      };

    case ProductActionTypes.GET_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
