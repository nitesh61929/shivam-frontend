import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ProfileComponent } from "./components";
import { ProfileFormComponent } from "./components/profile-form/profile-form.component";
import { ProfileContainerComponent } from "./containers";
import { ProfileFormContainerComponent } from "./containers/profile-form/profile-form-container.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { UpdatePasswordContainerComponent } from './containers/update-password/update-password-container.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

@NgModule({
  declarations: [
    ProfileContainerComponent,
    ProfileComponent,
    ProfileFormContainerComponent,
    ProfileFormComponent,
    UpdatePasswordContainerComponent,
    UpdatePasswordComponent,
  ],
  imports: [SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
