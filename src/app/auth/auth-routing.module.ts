import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthContainerComponent } from "./containers/auth/auth-container.component";
import { ForgotPasswordContainerComponent } from "./containers/forgot-password/forgot-password-container.component";
import { LoginContainerComponent } from "./containers/login/login-container.component";
import { ResetPasswordContainerComponent } from "./containers/reset-password/reset-password-container.component";

const routes: Routes = [
  {
    path: "",
    component: AuthContainerComponent,
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      {
        path: "login",
        component: LoginContainerComponent,
        data: {
          title: "Login",
        },
      },
      {
        path: "forgot-password",
        component: ForgotPasswordContainerComponent,
        data: {
          title: "Forgot password",
        },
      },
      {
        path: "reset-password",
        component: ResetPasswordContainerComponent,
        data: {
          title: "Reset password",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
