import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LoginComponent } from "@app/auth/components";
import { BaseComponent } from "@core/components/base/base.component";
import { LogIn } from "@core/store/actions";
import { selectAuthState } from "@core/store/state/core.state";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-login-container",
  templateUrl: "./login-container.component.html",
})
export class LoginContainerComponent extends BaseComponent implements OnInit {
  @ViewChild("loginCmp") loginCmp: LoginComponent;
  getState: Observable<any>;
  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      if (state.auth.error && this.loginCmp) {
        this.errorMessageService.handleServerSideError(
          this.loginCmp.loginForm,
          state.auth.error
        );
      }
    });
  }

  onSubmit(loginForm: FormGroup): void {
    if (loginForm.valid) {
      const payload = loginForm.value;
      this.store.dispatch(new LogIn(payload));
    }
  }
}
