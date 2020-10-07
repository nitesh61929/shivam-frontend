import { IConfiguration } from "@shared/interfaces";
import { ConfigurationActions, ConfigurationActionTypes } from "../actions";

export interface IConfigurationState {
  list: IConfiguration[];
  detail: IConfiguration;
  loading: boolean;
  error: Error;
}

const initialConfigurationState: IConfigurationState = {
  list: [],
  detail: null,
  loading: false,
  error: undefined,
};

export function ConfigurationReducer(
  state: IConfigurationState = initialConfigurationState,
  action: ConfigurationActions
) {
  switch (action.type) {
    case ConfigurationActionTypes.UPDATE_CONFIGURATION:
      return {
        ...state,
        loading: true,
      };

    case ConfigurationActionTypes.UPDATE_CONFIGURATION_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case ConfigurationActionTypes.UPDATE_CONFIGURATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ConfigurationActionTypes.LOAD_CONFIGURATIONS:
      return {
        ...state,
        loading: true,
      };

    case ConfigurationActionTypes.LOAD_CONFIGURATION_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,

        loading: false,
      };

    case ConfigurationActionTypes.LOAD_CONFIGURATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case ConfigurationActionTypes.GET_CONFIGURATION:
      return {
        ...state,
        loading: true,
      };

    case ConfigurationActionTypes.GET_CONFIGURATION_SUCCESS:
      return {
        ...state,
        detail: action.payload.payload,
        loading: false,
      };

    case ConfigurationActionTypes.GET_CONFIGURATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
