import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "@core/components/base/base.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent extends BaseComponent implements OnInit {
  @Output() submitClicked: EventEmitter<any> = new EventEmitter<any>();
  loginForm: FormGroup;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmitLoginForm() {
    this.submitClicked.emit(this.loginForm);
  }
}
