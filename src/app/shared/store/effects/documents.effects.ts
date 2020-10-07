import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { DocumentsService } from "@shared/services";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import {
  DocumentsActionTypes,
  GetPrivacyPolicyAction,
  GetPrivacyPolicyFailureAction,
  GetPrivacyPolicySuccessAction,
  GetTermsAndConditionAction,
  GetTermsAndConditionFailureAction,
  GetTermsAndConditionSuccessAction,
  UpdateDocumentsAction,
  UpdateDocumentsFailureAction,
  UpdateDocumentsSuccessAction,
} from "../actions";

@Injectable()
export class DocumentsEffects {
  constructor(
    private actions$: Actions,
    private documentsService: DocumentsService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() updateDocuments$ = this.actions$.pipe(
    ofType<UpdateDocumentsAction>(DocumentsActionTypes.UPDATE_DOCUMENTS),
    mergeMap((data) =>
      this.documentsService.updateDocument(data.payload).pipe(
        map(() => new UpdateDocumentsSuccessAction(data.payload)),
        catchError((error) => of(new UpdateDocumentsFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateDocumentsSuccess$ = this.actions$.pipe(
    ofType(DocumentsActionTypes.UPDATE_DOCUMENTS_SUCCESS),
    tap((response: any) => {
      const infoMessage = response.id
        ? this.translate.instant("item_updated_message")
        : this.translate.instant("item_added_message");
      this.snackbar.open(infoMessage, "success");
    })
  );

  // @Effect() getDocuments$ = this.actions$.pipe(
  //   ofType<GetDocumentsAction>(DocumentsActionTypes.GET_DOCUMENTS),
  //   mergeMap((d) =>
  //     this.documentsService.getDocuments(d.param).pipe(
  //       map((data) => {
  //         return new GetDocumentsSuccessAction(data);
  //       }),
  //       catchError((error) => of(new GetDocumentsFailureAction(error)))
  //     )
  //   )
  // );

  @Effect() getTermsAndConditions$ = this.actions$.pipe(
    ofType<GetTermsAndConditionAction>(
      DocumentsActionTypes.GET_TERMS_AND_CONDITIONS
    ),
    mergeMap((d) =>
      this.documentsService.getDocuments(d.param).pipe(
        map((data) => {
          return new GetTermsAndConditionSuccessAction(data);
        }),
        catchError((error) => of(new GetTermsAndConditionFailureAction(error)))
      )
    )
  );

  @Effect() getPrivacyPolicy$ = this.actions$.pipe(
    ofType<GetPrivacyPolicyAction>(DocumentsActionTypes.GET_PRIVACY_POLICY),
    mergeMap((d) =>
      this.documentsService.getDocuments(d.param).pipe(
        map((data) => {
          return new GetPrivacyPolicySuccessAction(data);
        }),
        catchError((error) => of(new GetPrivacyPolicyFailureAction(error)))
      )
    )
  );
}
