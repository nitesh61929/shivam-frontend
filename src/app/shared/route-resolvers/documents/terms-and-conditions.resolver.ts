import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { GetTermsAndConditionAction } from "@shared/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { EDocumentType } from "../../../admin/modules/documents/enums/document-type";
import { IDocument } from "../../../admin/modules/documents/interfaces";

@Injectable({
  providedIn: "root",
})
export class TermsAndConditionsResolver implements Resolve<any> {
  termsAndCondition$: Observable<IDocument>;
  privacyPolicy$: Observable<IDocument>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    const termsAndConditionParams = {
      type: EDocumentType.terms_and_conditions,
    };

    this.store.dispatch(
      new GetTermsAndConditionAction(termsAndConditionParams)
    );

    this.termsAndCondition$ = this.store.select(
      (store) => store.shared.documents.termsAndConditions
    );
    return this.termsAndCondition$.pipe(
      take(2),
      map((termsAndCondition: IDocument) => termsAndCondition)
    );
  }
}
