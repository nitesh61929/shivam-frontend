import { IProvinceDistricts } from "@shared/interfaces";
import {
  ProvincesWithDistrictsActions,
  ProvincesWithDistrictsActionTypes,
} from "../actions/provinces-with-districts.actions";

export interface IProvincesWithDistrictsState {
  provincesWithDistricts: IProvinceDistricts[];
  loading: boolean;
  error: Error;
}

const initialProvincesWithDistrictsState: IProvincesWithDistrictsState = {
  provincesWithDistricts: [],
  loading: false,
  error: undefined,
};

export function ProvincesWithDistrictsReducer(
  state: IProvincesWithDistrictsState = initialProvincesWithDistrictsState,
  action: ProvincesWithDistrictsActions
) {
  switch (action.type) {
    case ProvincesWithDistrictsActionTypes.LOAD_PROVINCES_DISTRICTS:
      return {
        ...state,
        loading: true,
      };

    case ProvincesWithDistrictsActionTypes.LOAD_PROVINCES_DISTRICTS_SUCCESS:
      return {
        ...state,
        provincesWithDistricts: action.listResponse.payload,
        loading: false,
      };

    case ProvincesWithDistrictsActionTypes.LOAD_PROVINCES_DISTRICTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
