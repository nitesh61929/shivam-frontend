import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { GetPrivacyPolicyAction } from "@shared/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { EDocumentType } from "../../../admin/modules/documents/enums/document-type";
import { IDocument } from "../../../admin/modules/documents/interfaces";

@Injectable({
  providedIn: "root",
})
export class PrivacyPolicyResolver implements Resolve<any> {
  termsAndCondition$: Observable<IDocument>;
  privacyPolicy$: Observable<IDocument>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    const privacyPolicyParams = {
      type: EDocumentType.privacy_policy,
    };

    this.store.dispatch(new GetPrivacyPolicyAction(privacyPolicyParams));

    this.privacyPolicy$ = this.store.select(
      (store) => store.shared.documents.privacyPolicy
    );
    return this.privacyPolicy$.pipe(
      take(2),
      map((privacyPolicy: IDocument) => privacyPolicy)
    );
  }
}
