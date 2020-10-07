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
import { IFormOptions } from "@shared/form/interfaces/form-options";
import { IDeliveryLocation, IDistrict } from "@shared/interfaces";
import { Observable } from "rxjs";

@Component({
  selector: "app-delivery-location-form",
  templateUrl: "./delivery-location-form.component.html",
})
export class DeliveryLocationFormComponent extends BaseComponent
  implements OnInit {
  @Output() saveOrUpdateDeliveryLocation: EventEmitter<
    FormGroup
  > = new EventEmitter<FormGroup>();
  @Output() cancelDeliveryLocation: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  provincesWithDistricts: any;
  @Input() loading$: Observable<boolean>;
  @Input() deliveryLocationDetail: IDeliveryLocation;
  formOptions: IFormOptions;
  deliveryLocationForm: FormGroup;
  selectedDistricts: IDistrict[];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setFormOptions();
    this.setDeliveryLocationForm();
    this.fetchDeliverylocationId();
  }

  fetchDeliverylocationId() {
    const deliveryLocationId = this.activatedRoute.snapshot.paramMap.get("id");

    if (deliveryLocationId && this.deliveryLocationDetail) {
      this.deliveryLocationForm.patchValue(this.deliveryLocationDetail);
      this.setProvince();
      this.setDistrict();
    }
  }

  setProvince() {
    const provinceData = this.provincesWithDistricts.find(
      (provinceWithDistrict) =>
        provinceWithDistrict.province.id ===
        this.deliveryLocationDetail.province.id
    );
    this.selectedDistricts = provinceData.province.districts;

    this.deliveryLocationForm.get("province").setValue(provinceData);
    this.deliveryLocationForm
      .get("province_id")
      .setValue(this.deliveryLocationDetail.province.id);
  }

  setDistrict() {
    this.deliveryLocationForm
      .get("district")
      .setValue(this.deliveryLocationDetail.district);
    this.deliveryLocationForm
      .get("district_id")
      .setValue(this.deliveryLocationDetail.district.id);
  }

  private setFormOptions() {
    if (this.deliveryLocationDetail && this.deliveryLocationDetail.id) {
      this.formOptions = {
        headerTitle: "edit_delivery_location_label",
        saveBtnLabel: "update_label",
        cancelBtnLabel: "cancel_label",
        formClass: "delivery-location-form",
      };
    } else {
      this.formOptions = {
        headerTitle: "add_delivery_location_label",
        saveBtnLabel: "save_label",
        cancelBtnLabel: "cancel_label",
        formClass: "delivery-location-form",
      };
    }
  }

  compareObjects(o1: any, o2: any) {
    if (o1 && o2 && o1.id === o2.id) {
      return true;
    } else {
      return false;
    }
  }

  onStateChange(event: any) {
    this.selectedDistricts = event.value.province.districts;
    this.deliveryLocationForm.get("district_id").setValue(null);
    this.deliveryLocationForm.get("district").setValue(null);

    this.deliveryLocationForm
      .get("province_id")
      .setValue(event.value.province.id);
  }

  onDistrictChange(event: any) {
    this.deliveryLocationForm.get("district_id").setValue(event.value.id);
  }

  private setDeliveryLocationForm() {
    this.deliveryLocationForm = this.formBuilder.group({
      id: [],
      name: ["", Validators.required],
      province: ["", Validators.required],
      district: ["", Validators.required],
      province_id: ["", Validators.required],
      district_id: ["", Validators.required],
      delivery_charge: ["", Validators.required],
    });
  }

  onSaveOrUpdateDeliveryLocationForm() {
    this.saveOrUpdateDeliveryLocation.emit(this.deliveryLocationForm);
  }

  onCancelDeliveryLocationForm() {
    this.cancelDeliveryLocation.emit();
  }
}
