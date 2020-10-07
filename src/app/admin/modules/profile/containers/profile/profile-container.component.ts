import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components/base";
import { AppRoutes } from "@core/enums";
import { IProfile } from "@core/interfaces";

@Component({
  selector: "app-profile-container",
  templateUrl: "./profile-container.component.html",
})
export class ProfileContainerComponent extends BaseComponent implements OnInit {
  profile: IProfile;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.trackRoute();
  }

  trackRoute() {
    this.activatedRoute.data.subscribe((data) => {
      this.profile = data.profile;
    });
  }

  onEditProfile() {
    this.redirectTo(`${AppRoutes.UPDATE_PROFILE_PAGE}/${this.profile.id}`);
  }

  onChangePassword() {
    this.redirectTo(AppRoutes.UPDATE_PASSWORD_PAGE);
  }
}
