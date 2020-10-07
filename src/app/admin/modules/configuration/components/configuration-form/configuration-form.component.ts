import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "@core/components/base";
import { CommonValidators } from "@core/validators";
import { IFormOptions } from "@shared/form/interfaces/form-options";
import { IConfiguration } from "@shared/interfaces";
import { Observable } from "rxjs";

@Component({
  selector: "app-configuration-form",
  templateUrl: "./configuration-form.component.html",
})
export class ConfigurationFormComponent extends BaseComponent
  implements OnInit {
  @Output() saveOrUpdateConfiguration: EventEmitter<
    FormGroup
  > = new EventEmitter<FormGroup>();
  @Input() configurations$: Observable<IConfiguration[]>;

  configurationForm: FormGroup;
  formOptions: IFormOptions;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.createConfigurationForm();

    this.setFormOptions();
    this.configurations$.subscribe((configurations) => {
      if (configurations && configurations.length > 0) {
        this.buildConfigurationForm(configurations);
      }
    });
  }

  buildConfigurationForm(configurations) {
    this.configurationForm.patchValue(configurations[0]);
    this.setFormOptions();
  }

  private setFormOptions() {
    if (this.configurationForm.get("id").value) {
      this.formOptions = {
        headerTitle: "configurations",
        saveBtnLabel: "update_label",
      };
    } else {
      this.formOptions = {
        headerTitle: "configurations",
        saveBtnLabel: "save_label",
      };
    }
  }

  private createConfigurationForm() {
    this.configurationForm = this.formBuilder.group({
      id: [],
      key: ["expected_delivery_date"],
      value: this.createValueFormGroup(),
    });
  }

  createValueFormGroup() {
    return this.formBuilder.group(
      {
        min: ["", [Validators.required, Validators.min(0)]],
        max: ["", [Validators.required, Validators.max(100)]],
      },
      {
        validator: CommonValidators.compare("min", "max"),
      }
    );
  }

  onSaveOrUpdateConfigurationForm() {
    this.saveOrUpdateConfiguration.emit(this.configurationForm);
  }
  onCancelConfigurationForm() {}
}
