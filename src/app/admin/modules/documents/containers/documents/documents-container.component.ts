import { Component, Injector, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components/base";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import {
  DocumentsActionTypes,
  GetPrivacyPolicyAction,
  GetTermsAndConditionAction,
  UpdateDocumentsAction,
} from "@shared/store";
import { Observable } from "rxjs";
import { EDocumentType } from "../../enums/document-type";
import { IDocument } from "../../interfaces";

@Component({
  selector: "app-documents-container",
  templateUrl: "./documents-container.component.html",
})
export class DocumentsContainerComponent extends BaseComponent
  implements OnInit {
  loading$: Observable<boolean>;
  termsAndConditions: IDocument;
  privacyPolicy: IDocument;
  termsAndCondition$: Observable<IDocument>;
  privacyPolicy$: Observable<IDocument>;

  constructor(
    injector: Injector,
    private store: Store<any>,
    updatedDocumentsSuccess$: Actions
  ) {
    super(injector);
    this.listenDocumentSuccess(updatedDocumentsSuccess$);
  }

  listenDocumentSuccess(updatedDocumentsSuccess$: Actions) {
    updatedDocumentsSuccess$
      .pipe(ofType(DocumentsActionTypes.UPDATE_DOCUMENTS_SUCCESS))
      .subscribe((d: any) => {
        if (d.payload.type === "terms") {
          this.dispatchTermsAndConditions();
        }
        if (d.payload.type === "privacy_policy") {
          this.dispatchPrivacyPolicy();
        }
      });
  }

  dispatchTermsAndConditions() {
    const termsAndConditionParams = {
      type: EDocumentType.terms_and_conditions,
    };

    this.store.dispatch(
      new GetTermsAndConditionAction(termsAndConditionParams)
    );
  }

  dispatchPrivacyPolicy() {
    const privacyPolicyParams = {
      type: EDocumentType.privacy_policy,
    };

    this.store.dispatch(new GetPrivacyPolicyAction(privacyPolicyParams));
  }

  ngOnInit(): void {
    this.listenObservables();
    this.trackRoute();
    this.listenObservables();
  }

  listenObservables() {
    this.loading$ = this.store.select(
      (store) => store.shared.documents.loading
    );

    this.termsAndCondition$ = this.store.select(
      (store) => store.shared.documents.termsAndConditions
    );

    this.privacyPolicy$ = this.store.select(
      (store) => store.shared.documents.privacyPolicy
    );

    this.termsAndCondition$.subscribe((d) => {
      this.termsAndConditions = d;
    });

    this.privacyPolicy$.subscribe((d) => {
      this.privacyPolicy = d;
    });
  }

  trackRoute() {
    this.activatedRoute.data.subscribe((data) => {
      this.termsAndConditions = data.termsAndConditions;
      this.privacyPolicy = data.privacyPolicy;
    });
  }

  onTermsAndConditionChange(termsAndConditionForm: FormGroup) {
    if (termsAndConditionForm.valid) {
      this.store.dispatch(
        new UpdateDocumentsAction(termsAndConditionForm.value)
      );
    }
  }

  onPrivacyAndPolicyChange(privacyPolicyForm: FormGroup) {
    if (privacyPolicyForm.valid) {
      this.store.dispatch(new UpdateDocumentsAction(privacyPolicyForm.value));
    }
  }
}
