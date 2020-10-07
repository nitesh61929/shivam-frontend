import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { IProfile } from "@core/interfaces";
import { CommonValidators } from "@core/validators";

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
})
export class ProfileFormComponent extends BaseComponent implements OnInit {
  @Output() profileUpdate: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Output() profileCancel: EventEmitter<null> = new EventEmitter<null>();
  @Input() profile: IProfile;
  profileForm: FormGroup;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.createProfileForm();
    this.buildForm();
  }

  buildForm() {
    this.profileForm.patchValue(this.profile);
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      username: [{ value: "", disabled: true }],
      mobile_number: [
        "",
        Validators.compose([CommonValidators.mobileNumber()]),
      ],
      details: this.createProfileDetailForm(),
    });
  }

  createProfileDetailForm() {
    return this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: [
        "",
        Validators.compose([Validators.required, CommonValidators.email()]),
      ],
    });
  }

  updateProfile() {
    this.profileUpdate.emit(this.profileForm);
  }

  onCancel() {
    this.profileCancel.emit();
  }
}
