import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/login/login.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { AuthContainerComponent } from "./containers/auth/auth-container.component";
import { ForgotPasswordContainerComponent } from "./containers/forgot-password/forgot-password-container.component";
import { LoginContainerComponent } from "./containers/login/login-container.component";
import { ResetPasswordContainerComponent } from "./containers/reset-password/reset-password-container.component";

@NgModule({
  declarations: [
    LoginComponent,
    LoginContainerComponent,
    AuthContainerComponent,
    ResetPasswordComponent,
    ResetPasswordContainerComponent,
    ForgotPasswordContainerComponent,
    ForgotPasswordComponent,
  ],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
