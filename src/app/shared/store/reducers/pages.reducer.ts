import { IPages } from "@shared/interfaces";
import { PagesActions, PagesActionTypes } from "../actions/pages.actions";

export interface IPagesState {
  list: IPages[];
  detail: IPages;
  loading: boolean;
  error: Error;
}

const initialPagesState: IPagesState = {
  list: [],
  detail: null,
  loading: false,
  error: undefined,
};

export function PagesReducer(
  state: IPagesState = initialPagesState,
  action: PagesActions
) {
  switch (action.type) {
    case PagesActionTypes.UPDATE_PAGES:
      return {
        ...state,
        loading: true,
      };

    case PagesActionTypes.UPDATE_PAGES_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case PagesActionTypes.UPDATE_PAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case PagesActionTypes.LOAD_PAGES:
      return {
        ...state,
        loading: true,
      };

    case PagesActionTypes.LOAD_PAGES_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,

        loading: false,
      };

    case PagesActionTypes.LOAD_PAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case PagesActionTypes.GET_PAGES:
      return {
        ...state,
        loading: true,
      };

    case PagesActionTypes.GET_PAGES_SUCCESS:
      return {
        ...state,
        detail: action.payload.payload,
        loading: false,
      };

    case PagesActionTypes.GET_PAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
