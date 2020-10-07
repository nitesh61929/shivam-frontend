import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class ErrorMessageService {
  constructor(private translate: TranslateService) {}

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: this.translate.instant("required_msg"),
      invalidPassword:
        "Password must be at least 6 characters long, and contain a number.",
      minlength: `${this.translate.instant("min_length_msg")} ${
        validatorValue.requiredLength
      }`,
      maxlength: `${this.translate.instant("max_length_msg")} ${
        validatorValue.requiredLength
      }`,
      min: `This field must have value greater than ${validatorValue.min - 1}`,
      max: `This field should not have value greater than ${validatorValue.max}`,
      invalidMatch: "The password and confirm password must match",
      email: this.translate.instant("valid_email_msg"),
      mobile_number: this.translate.instant("valid_mobile_number_msg"),
      unique: this.translate.instant("unique_module_msg"),
      requiredFileType: this.translate.instant("invalid_file_format"),
      compare: "Password does not match",
      matDatepickerMin: this.translate.instant("date_passed"),
      fileSize: `File should not be greater than ${validatorValue.sizeExpected}`,
    };
    return config[validatorName];
  }

  handleServerSideError(formGroup: FormGroup, error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error.code === 417 && error.error.errors) {
        Object.keys(error.error.errors).forEach((prop) => {
          const formControl = formGroup.get(prop);
          if (formControl) {
            formControl.setErrors({
              serverError: error.error.errors[prop],
            });
          }
        });
      }
    }
  }
}
