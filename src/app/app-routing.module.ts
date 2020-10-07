import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, NegateAuthGuard } from "@core/guards";
import {
  NoConnectionComponent,
  NoPermissionComponent,
  ServerErrorComponent,
} from "@shared/error-page";
import { AccessDeniedComponent } from "@shared/error-page/access-denied/access-denied.component";
import { NotFoundComponent } from "@shared/error-page/not-found";
import { PaymentStatusComponent } from "@shared/payment-status";
import { PrivacyPolicyComponent } from "@shared/privacy-policy/privacy-policy.component";
import { TermsAndConditionsComponent } from "@shared/terms-and-conditions/terms-and-conditions.component";
import { TermsAndConditionsResolver } from "./shared/route-resolvers/documents";
import { PrivacyPolicyResolver } from "./shared/route-resolvers/documents/privacy-policy.resolver";

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canActivate: [NegateAuthGuard],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: "access-denied",
    component: AccessDeniedComponent,
  },
  {
    path: "server-error",
    component: ServerErrorComponent,
  },
  {
    path: "no-connection",
    component: NoConnectionComponent,
  },
  {
    path: "no-permission",
    component: NoPermissionComponent,
  },
  {
    path: "not-found",
    component: NotFoundComponent,
  },
  {
    path: "terms-and-conditions",
    component: TermsAndConditionsComponent,
    resolve: {
      termsAndConditions: TermsAndConditionsResolver,
    },
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
    resolve: {
      privacyPolicy: PrivacyPolicyResolver,
    },
  },
  {
    path: "payment-status",
    component: PaymentStatusComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
