import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrivacyPolicyResolver } from "@shared/route-resolvers/documents/privacy-policy.resolver";
import { TermsAndConditionsResolver } from "@shared/route-resolvers/documents/terms-and-conditions.resolver";
import { ContactContainerComponent } from "./containers";

const routes: Routes = [
  {
    path: "",
    component: ContactContainerComponent,
    resolve: {
      termsAndConditions: TermsAndConditionsResolver,
      privacyPolicy: PrivacyPolicyResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
