import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { UpdatePasswordAction } from "@core/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";
import { UpdatePasswordComponent } from "../../components";

@Component({
  selector: "app-update-password-container",
  templateUrl: "./update-password-container.component.html",
})
export class UpdatePasswordContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("updatePasswordCmp") updatePasswordCmp: UpdatePasswordComponent;
  error$: Observable<Error>;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.listenObservables();
  }

  listenObservables() {
    this.error$ = this.store.select((store) => store.core.auth.error);
    this.error$.subscribe((err) => {
      if (err && this.updatePasswordCmp) {
        this.errorMessageService.handleServerSideError(
          this.updatePasswordCmp.passwordForm,
          err
        );
      }
    });
  }

  onPasswordUpdate(passwordForm: FormGroup) {
    if (passwordForm.valid) {
      this.store.dispatch(new UpdatePasswordAction(passwordForm.value));
    }
  }

  onCancelPasswordForm() {
    this.redirectTo(AppRoutes.PROFILE_PAGE);
  }
}
