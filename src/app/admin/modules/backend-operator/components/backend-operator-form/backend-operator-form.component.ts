import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { BaseComponent } from "@core/components";
import { IPermissions } from "@core/interfaces/permission";
import CommonUtilities from "@core/utilities/common-utilities";
import { CommonValidators } from "@core/validators";
import { IFormOptions } from "@shared/form/interfaces/form-options";
import { IBackendOperator } from "../../interfaces";
import { ModuleConfigurationFormComponent } from "../module-configuration-form/module-configuration-form.component";

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!control.invalid;
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl;
  }
}

@Component({
  selector: "app-backend-operator-form",
  templateUrl: "./backend-operator-form.component.html",
})
export class BackendOperatorFormComponent extends BaseComponent
  implements OnInit {
  @ViewChild("moduleConfigurationFormCmp")
  moduleConfigurationFormCmp: ModuleConfigurationFormComponent;
  @Output() saveOrUpdateBackendOperator: EventEmitter<
    FormGroup
  > = new EventEmitter<FormGroup>();
  @Output() cancelBackendOperator: EventEmitter<null> = new EventEmitter<
    null
  >();
  @Input() permissions: IPermissions;
  @Input() backendOperatorId: number;
  @Input() backendOperatorDetail: IBackendOperator;
  matcher = new MyErrorStateMatcher();
  backEndOperatorForm: FormGroup;
  formOptions: IFormOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setFormOptions();
    this.setBackendOperatorForm();
    this.buildForm();
    this.setPasswordValidation();
  }

  setPasswordValidation() {
    if (!this.backendOperatorId) {
      this.backEndOperatorForm
        .get("password")
        .setValidators(
          Validators.compose([Validators.required, Validators.minLength(8)])
        );
      this.backEndOperatorForm
        .get("password_confirmation")
        .setValidators(Validators.required);
    } else {
      this.backEndOperatorForm.get("password_confirmation").clearValidators();
      this.backEndOperatorForm
        .get("password")
        .setValidators(Validators.minLength(8));
    }
  }

  buildForm() {
    if (this.backendOperatorId && this.backendOperatorDetail) {
      this.backEndOperatorForm.patchValue(this.backendOperatorDetail);
    }
  }

  private setFormOptions(isEdit?: boolean) {
    if (this.backendOperatorId) {
      this.formOptions = {
        headerTitle: "edit_backend_operators",
        saveBtnLabel: "update_label",
        cancelBtnLabel: "cancel_label",
        formClass: "full",
      };
    } else {
      this.formOptions = {
        headerTitle: "create_backend_operator_label",
        saveBtnLabel: "save_label",
        cancelBtnLabel: "cancel_label",
        formClass: "full",
      };
    }
  }

  setBackendOperatorForm() {
    this.backEndOperatorForm = this.formBuilder.group(
      {
        username: ["", Validators.required],
        mobile_number: [
          "",
          Validators.compose([CommonValidators.mobileNumber()]),
        ],
        password: [""],
        password_confirmation: [""],
        permissions: [],
        details: this.setDetailFormGroup(),
      },
      {
        validator: CommonValidators.checkPassword(
          "password",
          "password_confirmation"
        ),
      }
    );
  }

  setDetailFormGroup() {
    return this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.email],
    });
  }

  onSaveOrUpdateBackendOperatorForm() {
    this.moduleConfigurationFormCmp.moduleWithMethodsFormArray.controls.forEach(
      (formGroup) => {
        formGroup.markAllAsTouched();
      }
    );

    if (this.moduleConfigurationFormCmp.moduleWithMethodsFormArray.valid) {
      const moduleConfigurationValue = this.moduleConfigurationFormCmp
        .moduleWithMethodsFormArray.value;
      // deep copy array
      const copyOfModuleConfigurationValue = moduleConfigurationValue.map((x) =>
        Object.assign({}, x)
      );

      const permissionObj = this.setPermissionObject(
        copyOfModuleConfigurationValue
      );
      this.backEndOperatorForm.get("permissions").setValue(permissionObj);
      this.saveOrUpdateBackendOperator.emit(this.backEndOperatorForm);
    }
  }

  setPermissionObject(moduleConfigurationValue: any) {
    moduleConfigurationValue.forEach((val) => {
      if (val.module && val.methods) {
        val[val.module] = val.methods;
        delete val.module;
        delete val.methods;
      }
    });

    const ob = Object.assign({}, moduleConfigurationValue);

    return ob;
  }

  onCancelBackendOperatorForm() {
    this.cancelBackendOperator.emit();
  }

  generatePassword() {
    const randomString = CommonUtilities.generateRandomString(8);
    this.backEndOperatorForm.get("password").setValue(randomString);
    this.backEndOperatorForm
      .get("password_confirmation")
      .setValue(randomString);
    this.backEndOperatorForm.get("password").markAsDirty();
    this.backEndOperatorForm.get("password_confirmation").markAsDirty();
  }
}
