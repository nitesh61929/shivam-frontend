import { IParameter } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";
import { IAnnouncement } from "../../interfaces/announcement";

export enum AnnouncementActionTypes {
  LOAD_ANNOUNCEMENT = "[ANNOUNCEMENT] Load Announcement",
  LOAD_ANNOUNCEMENT_SUCCESS = "[ANNOUNCEMENT] Load Announcement Success",
  LOAD_ANNOUNCEMENT_FAILURE = "[ANNOUNCEMENT] Load Announcement Failure",
  ADD_UPDATE_ANNOUNCEMENT = "[ANNOUNCEMENT] Add Update Announcement",
  ADD_UPDATE_ANNOUNCEMENT_SUCCESS = "[ANNOUNCEMENT] Add Update Announcement Success",
  ADD_UPDATE_ANNOUNCEMENT_FAILURE = "[ANNOUNCEMENT] Add Update Announcement Failure",
  GET_ANNOUNCEMENT = "[ANNOUNCEMENT] Get Announcement",
  GET_ANNOUNCEMENT_SUCCESS = "[ANNOUNCEMENT] Get Announcement Success",
  GET_ANNOUNCEMENT_FAILURE = "[ANNOUNCEMENT] Get Announcement Failure",
  DELETE_ANNOUNCEMENT = "[ANNOUNCEMENT] Delete Announcement",
  DELETE_ANNOUNCEMENT_SUCCESS = "[ANNOUNCEMENT] Delete Announcement Success",
  DELETE_ANNOUNCEMENT_FAILURE = "[ANNOUNCEMENT] Delete Announcement Failure",
  TOGGLE_ANNOUNCEMENT = "[ANNOUNCEMENT] Toggle Announcement",
  TOGGLE_ANNOUNCEMENT_SUCCESS = "[ANNOUNCEMENT] Toggle Announcement Success",
  TOGGLE_ANNOUNCEMENT_FAILURE = "[ANNOUNCEMENT] Toggle Announcement Failure",
}

export class LoadAnnouncementAction implements Action {
  readonly type = AnnouncementActionTypes.LOAD_ANNOUNCEMENT;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadAnnouncementSuccessAction implements Action {
  readonly type = AnnouncementActionTypes.LOAD_ANNOUNCEMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadAnnouncementFailureAction implements Action {
  readonly type = AnnouncementActionTypes.LOAD_ANNOUNCEMENT_FAILURE;

  constructor(public payload: string) {}
}

export class AddUpdateAnnouncementAction implements Action {
  readonly type = AnnouncementActionTypes.ADD_UPDATE_ANNOUNCEMENT;

  constructor(public payload: any) {}
}
export class AddUpdateAnnouncementSuccessAction implements Action {
  readonly type = AnnouncementActionTypes.ADD_UPDATE_ANNOUNCEMENT_SUCCESS;

  constructor(public payload: IAnnouncement) {}
}
export class AddUpdateAnnouncementFailureAction implements Action {
  readonly type = AnnouncementActionTypes.ADD_UPDATE_ANNOUNCEMENT_FAILURE;

  constructor(public payload: Error) {}
}

export class GetAnnouncementAction implements Action {
  readonly type = AnnouncementActionTypes.GET_ANNOUNCEMENT;

  constructor(public id: number) {}
}

export class GetAnnouncementSuccessAction implements Action {
  readonly type = AnnouncementActionTypes.GET_ANNOUNCEMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetAnnouncementFailureAction implements Action {
  readonly type = AnnouncementActionTypes.GET_ANNOUNCEMENT_FAILURE;

  constructor(public payload: any) {}
}

export class DeleteAnnouncementAction implements Action {
  readonly type = AnnouncementActionTypes.DELETE_ANNOUNCEMENT;

  constructor(public id: number) {}
}

export class DeleteAnnouncementSuccessAction implements Action {
  readonly type = AnnouncementActionTypes.DELETE_ANNOUNCEMENT_SUCCESS;

  constructor(public id: number) {}
}

export class DeleteAnnouncementFailureAction implements Action {
  readonly type = AnnouncementActionTypes.DELETE_ANNOUNCEMENT_FAILURE;

  constructor(public payload: string) {}
}

export class ToggleAnnouncementAction implements Action {
  readonly type = AnnouncementActionTypes.TOGGLE_ANNOUNCEMENT;

  constructor(public id: number, public payload: any) {}
}

export class ToggleAnnouncementSuccessAction implements Action {
  readonly type = AnnouncementActionTypes.TOGGLE_ANNOUNCEMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ToggleAnnouncementFailureAction implements Action {
  readonly type = AnnouncementActionTypes.TOGGLE_ANNOUNCEMENT_FAILURE;

  constructor(public payload: string) {}
}

export type AnnouncementActions =
  | LoadAnnouncementAction
  | LoadAnnouncementSuccessAction
  | LoadAnnouncementFailureAction
  | AddUpdateAnnouncementAction
  | AddUpdateAnnouncementSuccessAction
  | AddUpdateAnnouncementFailureAction
  | GetAnnouncementAction
  | GetAnnouncementSuccessAction
  | GetAnnouncementFailureAction
  | DeleteAnnouncementAction
  | DeleteAnnouncementSuccessAction
  | DeleteAnnouncementFailureAction
  | ToggleAnnouncementAction
  | ToggleAnnouncementSuccessAction
  | ToggleAnnouncementFailureAction;
