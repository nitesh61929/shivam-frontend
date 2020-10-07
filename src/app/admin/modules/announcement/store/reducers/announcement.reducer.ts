import { IPagination } from "@core/interfaces";
import { IAnnouncement } from "../../interfaces/announcement";
import {
  AnnouncementActions,
  AnnouncementActionTypes,
} from "../actions/announcement.actions";

export interface IAnnouncementState {
  list: IAnnouncement[];
  detail: IAnnouncement;
  loading: boolean;
  pagination: IPagination;
  error: Error;
}

const initialAnnouncementState: IAnnouncementState = {
  list: [],
  detail: null,
  loading: false,
  pagination: null,
  error: undefined,
};

export function AnnouncementReducer(
  state: IAnnouncementState = initialAnnouncementState,
  action: AnnouncementActions
) {
  switch (action.type) {
    case AnnouncementActionTypes.LOAD_ANNOUNCEMENT:
      return {
        ...state,
        loading: true,
      };

    case AnnouncementActionTypes.LOAD_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        pagination: action.payload.pagination,
        loading: false,
        error: action.payload,
      };

    case AnnouncementActionTypes.LOAD_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case AnnouncementActionTypes.ADD_UPDATE_ANNOUNCEMENT:
      return {
        ...state,
        loading: true,
      };

    case AnnouncementActionTypes.ADD_UPDATE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case AnnouncementActionTypes.ADD_UPDATE_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AnnouncementActionTypes.GET_ANNOUNCEMENT:
      return {
        ...state,
        loading: true,
      };

    case AnnouncementActionTypes.GET_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        detail: action.payload.payload,
        loading: false,
      };

    case AnnouncementActionTypes.GET_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AnnouncementActionTypes.TOGGLE_ANNOUNCEMENT:
      return {
        ...state,
        loading: true,
      };

    case AnnouncementActionTypes.TOGGLE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,

        loading: false,
        error: action.payload,
      };

    case AnnouncementActionTypes.TOGGLE_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AnnouncementActionTypes.DELETE_ANNOUNCEMENT:
      return {
        ...state,
        loading: true,
      };

    case AnnouncementActionTypes.DELETE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        list: state.list.filter(
          (announcement) => announcement.id !== action.id
        ),
        loading: false,
      };

    case AnnouncementActionTypes.DELETE_ANNOUNCEMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
