import { IFeedback } from "@app/admin/modules/order/interfaces/feedback";
import { IPagination } from "@core/interfaces";
import { FeedbackActions, FeedbackActionTypes } from "../actions";

export interface IFeedbackState {
  list: IFeedback[];
  loading: boolean;
  pagination: IPagination;
  error: Error;
}

const initialFeedbackState: IFeedbackState = {
  list: [],
  loading: false,
  pagination: null,
  error: undefined,
};

export function FeedbackReducer(
  state: IFeedbackState = initialFeedbackState,
  action: FeedbackActions
) {
  switch (action.type) {
    case FeedbackActionTypes.LOAD_FEEDBACK:
      return {
        ...state,
        loading: true,
      };

    case FeedbackActionTypes.LOAD_FEEDBACK_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        pagination: action.payload.pagination,
        loading: false,
        error: action.payload,
      };

    case FeedbackActionTypes.LOAD_FEEDBACK_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
