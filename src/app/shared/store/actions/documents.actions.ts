import { IParameter } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum DocumentsActionTypes {
  UPDATE_DOCUMENTS = "[DOCUMENTS] Update Documents",
  UPDATE_DOCUMENTS_SUCCESS = "[DOCUMENTS] Update Documents Success",
  UPDATE_DOCUMENTS_FAILURE = "[DOCUMENTS] Update Documents Failure",
  // GET_DOCUMENTS = "[DOCUMENTS] Get Documents",
  // GET_DOCUMENTS_SUCCESS = "[DOCUMENTS] Get Documents Success",
  // GET_DOCUMENTS_FAILURE = "[DOCUMENTS] Get Documents Failure",

  GET_TERMS_AND_CONDITIONS = "[DOCUMENTS] Get Terms And Condition",
  GET_TERMS_AND_CONDITIONS_SUCCESS = "[DOCUMENTS] Get Terms And Condition Success",
  GET_TERMS_AND_CONDITIONS_FAILURE = "[DOCUMENTS] Get Terms And Condition Failure",
  GET_PRIVACY_POLICY = "[DOCUMENTS] Get Privacy Policy",
  GET_PRIVACY_POLICY_SUCCESS = "[DOCUMENTS] Get Privacy Policy Success",
  GET_PRIVACY_POLICY_FAILURE = "[DOCUMENTS] Get Privacy Policy Failure",
}

export class UpdateDocumentsAction implements Action {
  readonly type = DocumentsActionTypes.UPDATE_DOCUMENTS;

  constructor(public payload: any) {}
}
export class UpdateDocumentsSuccessAction implements Action {
  readonly type = DocumentsActionTypes.UPDATE_DOCUMENTS_SUCCESS;

  constructor(public payload: any) {}
}
export class UpdateDocumentsFailureAction implements Action {
  readonly type = DocumentsActionTypes.UPDATE_DOCUMENTS_FAILURE;

  constructor(public payload: Error) {}
}

// export class GetDocumentsAction implements Action {
//   readonly type = DocumentsActionTypes.GET_DOCUMENTS;

//   constructor(public param: IParameter) {
//     param = httpUtilites.setParameters(param);
//   }
// }

// export class GetDocumentsSuccessAction implements Action {
//   readonly type = DocumentsActionTypes.GET_DOCUMENTS_SUCCESS;

//   constructor(public payload: any) {}
// }

// export class GetDocumentsFailureAction implements Action {
//   readonly type = DocumentsActionTypes.GET_DOCUMENTS_FAILURE;

//   constructor(public payload: any) {}
// }

export class GetTermsAndConditionAction implements Action {
  readonly type = DocumentsActionTypes.GET_TERMS_AND_CONDITIONS;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class GetTermsAndConditionSuccessAction implements Action {
  readonly type = DocumentsActionTypes.GET_TERMS_AND_CONDITIONS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTermsAndConditionFailureAction implements Action {
  readonly type = DocumentsActionTypes.GET_TERMS_AND_CONDITIONS_FAILURE;

  constructor(public payload: any) {}
}
export class GetPrivacyPolicyAction implements Action {
  readonly type = DocumentsActionTypes.GET_PRIVACY_POLICY;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class GetPrivacyPolicySuccessAction implements Action {
  readonly type = DocumentsActionTypes.GET_PRIVACY_POLICY_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPrivacyPolicyFailureAction implements Action {
  readonly type = DocumentsActionTypes.GET_PRIVACY_POLICY_FAILURE;

  constructor(public payload: any) {}
}

export type DocumentsActions =
  | UpdateDocumentsAction
  | UpdateDocumentsSuccessAction
  | UpdateDocumentsFailureAction
  // | GetDocumentsAction
  // | GetDocumentsSuccessAction
  // | GetDocumentsFailureAction
  | GetTermsAndConditionAction
  | GetTermsAndConditionSuccessAction
  | GetTermsAndConditionFailureAction
  | GetPrivacyPolicyAction
  | GetPrivacyPolicySuccessAction
  | GetPrivacyPolicyFailureAction;
