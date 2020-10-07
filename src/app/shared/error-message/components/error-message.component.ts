import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ErrorMessageService } from "../services/error-message.service";

@Component({
  selector: "app-error-message",
  templateUrl: "./error-message.component.html",
})
export class ErrorMessageComponent implements OnInit {
  @Input() control: FormControl;
  constructor(private errorMessageService: ErrorMessageService) {}

  ngOnInit(): void {}

  get errorMessage() {
    if (this.control) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName)) {
          return this.errorMessageService.getValidatorErrorMessage(
            propertyName,
            this.control.errors[propertyName]
          );
        }
      }
    }

    return null;
  }
}
