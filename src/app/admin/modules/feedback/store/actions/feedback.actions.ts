import { IParameter } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum FeedbackActionTypes {
  LOAD_FEEDBACK = "[FEEDBACK] Load Feedback",
  LOAD_FEEDBACK_SUCCESS = "[FEEDBACK] Load Feedback Success",
  LOAD_FEEDBACK_FAILURE = "[FEEDBACK] Load Feedback Failure",
}

export class LoadFeedbackAction implements Action {
  readonly type = FeedbackActionTypes.LOAD_FEEDBACK;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadFeedbackSuccessAction implements Action {
  readonly type = FeedbackActionTypes.LOAD_FEEDBACK_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadFeedbackFailureAction implements Action {
  readonly type = FeedbackActionTypes.LOAD_FEEDBACK_FAILURE;

  constructor(public payload: string) {}
}

export type FeedbackActions =
  | LoadFeedbackAction
  | LoadFeedbackSuccessAction
  | LoadFeedbackFailureAction;
