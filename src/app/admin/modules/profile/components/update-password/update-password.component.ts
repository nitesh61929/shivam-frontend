import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { CommonValidators } from "@core/validators";
import { IFormOptions } from "@shared/form/interfaces/form-options";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  @Output() cancelPassword: EventEmitter<null> = new EventEmitter<null>();
  @Output() updatePassword: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  passwordForm: FormGroup;
  formOptions: IFormOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPasswordForm();
    this.setFormOptions();
  }

  private setFormOptions(isEdit?: boolean) {
    this.formOptions = {
      headerTitle: "change_password_label",
      saveBtnLabel: "update_label",
      cancelBtnLabel: "cancel_label",
      formClass: "password-form",
    };
  }

  setPasswordForm() {
    this.passwordForm = this.formBuilder.group(
      {
        old_password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        new_password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        password_confirmation: ["", Validators.compose([Validators.required])],
      },
      {
        validator: CommonValidators.checkPassword(
          "new_password",
          "password_confirmation"
        ),
      }
    );
  }

  onUpdatePassword() {
    this.updatePassword.emit(this.passwordForm);
  }

  onCancelPasswordForm() {
    this.cancelPassword.emit();
  }
}
