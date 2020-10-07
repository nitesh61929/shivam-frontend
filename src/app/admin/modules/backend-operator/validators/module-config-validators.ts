import { FormControl } from "@angular/forms";

export class ModuleConfigValidators {
  static uniqueModule(): any {
    return (control: FormControl) => {
      let formArrayValue = [];
      if (control.parent && control.parent.parent && control.value) {
        formArrayValue = control.parent.parent.value;
        const moduleExists = formArrayValue.find(
          (value) => value.module === control.value
        );
        if (moduleExists) {
          return {
            uniqueModule: {
              valid: false,
            },
          };
        }
      }
      return null;
    };
  }
}
