import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import CommonUtilities from "@core/utilities/common-utilities";

export class CommonValidators {
  static email(): ValidatorFn {
    return (control: FormControl) => {
      const EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g;

      return EMAIL_REGEXP.test(control.value)
        ? null
        : {
            email: {
              valid: false,
            },
          };
    };
  }

  static mobileNumber(): ValidatorFn {
    return (control: FormControl) => {
      if (control.value !== null) {
        const MOBILE_NUMBER_REGEXP = /^$|^((\\+91-?)|0)?[0-9]{10}$/g;

        return MOBILE_NUMBER_REGEXP.test(control.value)
          ? null
          : {
              mobile_number: {
                valid: false,
              },
            };
      }
    };
  }

  static checkPassword(
    passwordField: string,
    confirmPasswordField: string
  ): ValidatorFn {
    return (formGroup: FormGroup) => {
      const pass = formGroup.get(passwordField).value;
      const confirmPass = formGroup.get(confirmPasswordField).value;

      if (pass && confirmPass) {
        if (pass !== confirmPass) {
          return {
            compare_password: {
              valid: false,
            },
          };
        }
      }
      return null;
    };
  }

  static checkFileType(types: Array<string>): ValidatorFn {
    return (control: FormControl) => {
      const file = control.value;
      if (file && file.name) {
        const extension = file.name.split(".").pop();
        types.forEach((type) => {
          type.toLowerCase();
        });
        if (types.indexOf(extension.toLowerCase()) === -1) {
          return {
            requiredFileType: {
              valid: false,
            },
          };
        }

        return null;
      }
      return null;
    };
  }

  /**
   *
   * @param limitFileSizeInKB should be in KB
   */
  static checkFileSize(): ValidatorFn {
    return (control: FormControl) => {
      const file = control.value;
      if (file && file.name) {
        const fileSize = Math.round(file.size / 1024);
        const extension = file.name.split(".").pop();
        const expectedFileSizeInKb: any = CommonUtilities.getFileSize(
          extension
        );
        const sizeInMB = CommonUtilities.formatSizeUnits(
          expectedFileSizeInKb * 1024
        );
        if (fileSize >= expectedFileSizeInKb) {
          return {
            fileSize: {
              valid: false,
              sizeExpected: sizeInMB,
            },
          };
        }
        return null;
      }
      return null;
    };
  }

  static compare(minField: string, maxField: string) {
    return (fg: FormGroup) => {
      const minValue = fg.get(minField).value;
      const maxValue = fg.get(maxField).value;

      if (minValue && maxValue) {
        if (minValue > maxValue) {
          return {
            compare: {
              valid: false,
            },
          };
        }
      }

      return null;
    };
  }
}
