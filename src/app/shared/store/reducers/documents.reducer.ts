import { IDocument } from "@shared/interfaces";
import { DocumentsActions, DocumentsActionTypes } from "../actions";

export interface IDocumentState {
  loading: boolean;
  error: Error;
  termsAndConditions: IDocument;
  privacyPolicy: IDocument;
}

const initialDocumentState: IDocumentState = {
  loading: false,
  error: undefined,
  termsAndConditions: null,
  privacyPolicy: null,
};

export function DocumentsReducer(
  state: IDocumentState = initialDocumentState,
  action: DocumentsActions
) {
  switch (action.type) {
    case DocumentsActionTypes.UPDATE_DOCUMENTS:
      return {
        ...state,
        loading: true,
      };

    case DocumentsActionTypes.UPDATE_DOCUMENTS_SUCCESS:
      return {
        ...state,

        loading: false,
        error: action.payload,
      };

    case DocumentsActionTypes.UPDATE_DOCUMENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // case DocumentsActionTypes.GET_DOCUMENTS:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    // case DocumentsActionTypes.GET_DOCUMENTS_SUCCESS:
    //   return {
    //     ...state,
    //     termsAndConditions:
    //       action.payload.payload &&
    //       action.payload.payload.length > 0 &&
    //       action.payload.payload[0].type === "terms"
    //         ? action.payload.payload[0]
    //         : {},
    //     privacyPolicy:
    //       action.payload.payload &&
    //       action.payload.payload.length > 0 &&
    //       action.payload.payload[0].type === "privacy_policy"
    //         ? action.payload.payload[0]
    //         : {},
    //     loading: false,
    //     error: action.payload,
    //   };

    // case DocumentsActionTypes.GET_DOCUMENTS_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };

    case DocumentsActionTypes.GET_TERMS_AND_CONDITIONS:
      return {
        ...state,
        loading: true,
      };

    case DocumentsActionTypes.GET_TERMS_AND_CONDITIONS_SUCCESS:
      return {
        ...state,
        termsAndConditions:
          action.payload.payload &&
          action.payload.payload.length > 0 &&
          action.payload.payload[0].type === "terms"
            ? action.payload.payload[0]
            : {},
        loading: false,
        error: action.payload,
      };

    case DocumentsActionTypes.GET_TERMS_AND_CONDITIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DocumentsActionTypes.GET_PRIVACY_POLICY:
      return {
        ...state,
        loading: true,
      };

    case DocumentsActionTypes.GET_PRIVACY_POLICY_SUCCESS:
      return {
        ...state,

        privacyPolicy:
          action.payload.payload &&
          action.payload.payload.length > 0 &&
          action.payload.payload[0].type === "privacy_policy"
            ? action.payload.payload[0]
            : {},
        loading: false,
        error: action.payload,
      };

    case DocumentsActionTypes.GET_PRIVACY_POLICY_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
