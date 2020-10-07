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
import { IUser } from "@core/interfaces";
import { IFormOptions } from "@shared/form/interfaces/form-options";
import { IDistrict } from "@shared/interfaces";
import { Observable } from "rxjs";

@Component({
  selector: "app-consumer-form",
  templateUrl: "./consumer-form.component.html",
})
export class ConsumerFormComponent extends BaseComponent implements OnInit {
  @Output() updateConsumer: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Output() cancelConsumer: EventEmitter<null> = new EventEmitter<null>();
  @Input() consumerDetail$: Observable<IUser>;
  @Input() provincesWithDistricts: any;
  @Input() error$: Error;
  selectedDistricts: IDistrict[];
  consumerId: string;
  consumerForm: FormGroup;
  formOptions: IFormOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.createConsumerForm();
    this.fetchConsumerById();
    this.setFormOptions();
  }

  fetchConsumerById() {
    this.consumerId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.consumerId) {
      this.consumerDetail$.subscribe((consumerDetail: IUser) => {
        if (consumerDetail) {
          this.consumerForm.reset();
          this.consumerForm.patchValue(consumerDetail);

          this.setStatAndDisctriceFormValue(consumerDetail);
        }
      });
    }
  }

  setStatAndDisctriceFormValue(consumerDetail: any) {
    if (this.provincesWithDistricts && this.provincesWithDistricts.length > 0) {
      this.setStateData(consumerDetail);
      this.setDistrictData(consumerDetail);
    }
  }

  setStateData(consumerDetail: any) {
    const stateData = this.provincesWithDistricts.find(
      (provinceWithDistrict) =>
        provinceWithDistrict.province.name.toLowerCase() ===
        consumerDetail.details.state.toLowerCase()
    );

    this.selectedDistricts = stateData.province.districts;
    this.consumerForm.get("details").get("stateData").setValue(stateData);
  }

  setDistrictData(consumerDetail: any) {
    this.provincesWithDistricts.forEach((provincesWithDistricts) => {
      if (
        provincesWithDistricts.province.name.toLowerCase() ===
        consumerDetail.details.state.toLowerCase()
      ) {
        provincesWithDistricts.province.districts.forEach((district) => {
          if (district.name === consumerDetail.details.district) {
            this.consumerForm
              .get("details")
              .get("districtData")
              .setValue(district);
          }
        });
      }
    });
  }

  onStateChange(event: any) {
    this.selectedDistricts = event.value.province.districts;
    this.consumerForm.get("details").get("districtData").setValue(null);
    this.consumerForm.get("details").get("district").setValue(null);
    this.consumerForm
      .get("details")
      .get("state")
      .setValue(event.value.province.name);
  }

  onDistrictChange(event: any) {
    this.consumerForm.get("details").get("district").setValue(event.value.name);
  }

  setFormOptions() {
    this.formOptions = {
      headerTitle: "edit_consumer_label",
      saveBtnLabel: "update_label",
      cancelBtnLabel: "cancel_label",
      formClass: "consumer-form full",
    };
  }

  private createConsumerForm() {
    this.consumerForm = this.formBuilder.group({
      id: [""],
      username: [""],
      mobile_number: [""],
      details: this.setDetailFormGroup(),
    });
  }

  setDetailFormGroup() {
    return this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.email],
      street: ["", Validators.required],
      city: ["", Validators.required],
      stateData: ["", Validators.required],
      districtData: ["", Validators.required],
      state: [""],
      district: [""],
    });
  }

  onUpdateConsumerForm() {
    this.updateConsumer.emit(this.consumerForm);
  }

  onCancelConsumerForm() {
    this.cancelConsumer.emit();
  }
}
