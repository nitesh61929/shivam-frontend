import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { IProfile } from "@core/interfaces";
import { UpdateProfileAction } from "@core/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ProfileFormComponent } from "../../components";

@Component({
  selector: "app-profile-form-container",
  templateUrl: "./profile-form-container.component.html",
})
export class ProfileFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("profileFormCmp") profileFormCmp: ProfileFormComponent;
  profile: IProfile;
  error$: Observable<Error>;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.trackRoute();
    this.listenObservables();
  }

  listenObservables() {
    this.error$ = this.store.select((store) => store.core.auth.error);
    this.error$.subscribe((err) => {
      if (err && this.profileFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.profileFormCmp.profileForm,
          err
        );
      }
    });
  }

  trackRoute() {
    this.activatedRoute.data.subscribe((data) => {
      this.profile = data.profile;
    });
  }

  onProfileUpdate(profileForm: FormGroup) {
    if (profileForm.valid) {
      this.store.dispatch(new UpdateProfileAction(profileForm.value));
    }
  }

  onCancelProfile() {
    this.redirectTo(AppRoutes.PROFILE_PAGE);
  }
}
