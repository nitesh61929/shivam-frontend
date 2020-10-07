import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import CommonUtilities from "@core/utilities/common-utilities";
import { CommonValidators } from "@core/validators";
import { IFormOptions } from "@shared/form/interfaces/form-options";
import {
  IDeliveryLocation,
  IErpDealer,
  IOnlineDeliveryPartner,
} from "@shared/interfaces";
import { ErpDealersService } from "@shared/services";
import { Observable } from "rxjs";
import { debounceTime, finalize, switchMap, tap } from "rxjs/operators";
import { IDeliverLocation } from "../../interfaces/delivery-location";

@Component({
  selector: "app-online-delivery-partner-form",
  templateUrl: "./online-delivery-partner-form.component.html",
  styles: [],
})
export class OnlineDeliveryPartnerFormComponent extends BaseComponent
  implements OnInit {
  @Output() saveOrUpdateOnlineDeliveryPartner: EventEmitter<
    FormGroup
  > = new EventEmitter<FormGroup>();
  @Output() cancelOnlineDeliveryPartner: EventEmitter<null> = new EventEmitter<
    null
  >();
  @Input() onlineDeliveryPartnerDetail$: Observable<IOnlineDeliveryPartner>;
  @Input() erpDealers: IErpDealer;
  @Input() deliveryLocations$: Observable<IDeliveryLocation[]>;
  @Input() error$: Error;
  deliveryLocations: IDeliveryLocation[];
  formOptions: IFormOptions;
  onlineDeliveryPartnerForm: FormGroup;
  onlineDeliveryPartnerId: string;
  filteredDealerOptions: Observable<any>;
  isLoading: boolean;
  dealerCtrl = new FormControl();

  constructor(
    injector: Injector,
    private erpDealersService: ErpDealersService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.listenObservables();
    this.setOnlineDeliveryPartnerForm();
    this.buildForm();
    this.setPasswordValidation();

    this.onlineDeliveryPartnerForm
      .get("dealers")
      .valueChanges.pipe(
        debounceTime(300),
        tap(() => (this.isLoading = true)),
        switchMap((value) =>
          this.erpDealersService
            .getErpDealers({
              search: value,
            })
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((dealers) => (this.filteredDealerOptions = dealers.payload));
  }

  setPasswordValidation() {
    if (!this.onlineDeliveryPartnerId) {
      this.onlineDeliveryPartnerForm
        .get("password")
        .setValidators(
          Validators.compose([Validators.required, Validators.minLength(8)])
        );
      this.onlineDeliveryPartnerForm
        .get("password_confirmation")
        .setValidators(Validators.required);
    } else {
      this.onlineDeliveryPartnerForm
        .get("password_confirmation")
        .clearValidators();
      this.onlineDeliveryPartnerForm
        .get("password")
        .setValidators(Validators.minLength(8));
    }
  }

  listenObservables() {
    this.deliveryLocations$.subscribe((deliveryLocations) => {
      this.deliveryLocations = deliveryLocations;
    });
  }

  buildForm() {
    this.onlineDeliveryPartnerId = this.activatedRoute.snapshot.paramMap.get(
      "id"
    );
    if (this.onlineDeliveryPartnerId) {
      this.onlineDeliveryPartnerDetail$.subscribe(
        (onlineDeliveryPartnerDetail: any) => {
          if (onlineDeliveryPartnerDetail) {
            this.onlineDeliveryPartnerForm.patchValue(
              onlineDeliveryPartnerDetail
            );
            this.setDeliveryLocationIds(
              onlineDeliveryPartnerDetail.delivery_partner.delivery_locations
            );
            this.onlineDeliveryPartnerForm
              .get("dealers")
              .setValue(onlineDeliveryPartnerDetail.delivery_partner);
            this.onlineDeliveryPartnerForm
              .get("delivery_partner")
              .get("in_house")
              .setValue(
                onlineDeliveryPartnerDetail.delivery_partner.in_house.toString()
              );
            this.onlineDeliveryPartnerForm
              .get("external_id")
              .setValue(
                onlineDeliveryPartnerDetail?.delivery_partner?.extras
                  ?.dealerCode
              );
            this.formOptions = {
              headerTitle: "edit_delivery_partner_label",
              saveBtnLabel: "update_label",
              cancelBtnLabel: "cancel_label",
              formClass: "dealer-form full",
            };
          }
        }
      );
    } else {
      this.setFormOptions();
    }
  }

  private setDeliveryLocationIds(deliveryLocations: IDeliverLocation[]) {
    if (deliveryLocations && deliveryLocations.length > 0) {
      const idArray = [];
      deliveryLocations.forEach((deliveryLocation) => {
        idArray.push(deliveryLocation.id);
      });
      this.onlineDeliveryPartnerForm
        .get("delivery_partner")
        .get("delivery_location_ids")
        .setValue(idArray);
    }
  }

  setFormOptions() {
    this.formOptions = {
      headerTitle: "create_delivery_partner_label",
      saveBtnLabel: "save_label",
      cancelBtnLabel: "cancel_label",
      formClass: "dealer-form full",
    };
  }

  setOnlineDeliveryPartnerForm() {
    this.onlineDeliveryPartnerForm = this.formBuilder.group(
      {
        id: [""],
        dealers: ["", Validators.required],
        username: ["", Validators.required],
        mobile_number: [
          "",
          Validators.compose([
            Validators.required,
            CommonValidators.mobileNumber(),
          ]),
        ],
        password: [""],
        password_confirmation: [""],
        external_id: ["", Validators.required],
        details: this.setDetailFormGroup(),
        delivery_partner: this.setDeliveryPartnerFormGroup(),
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

  setDeliveryPartnerFormGroup() {
    return this.formBuilder.group({
      dealer_legal_name: [""],
      in_house: ["0", Validators.required],
      vat_number: ["", Validators.maxLength(20)],
      delivery_location_ids: ["", Validators.required],
    });
  }

  onSaveOrUpdateDealerForm() {
    this.saveOrUpdateOnlineDeliveryPartner.emit(this.onlineDeliveryPartnerForm);
  }

  onCancelDealerForm() {
    this.cancelOnlineDeliveryPartner.emit();
  }

  generatePassword() {
    const randomString = CommonUtilities.generateRandomString(8);
    this.onlineDeliveryPartnerForm.get("password").setValue(randomString);
    this.onlineDeliveryPartnerForm
      .get("password_confirmation")
      .setValue(randomString);
    this.onlineDeliveryPartnerForm.get("password").markAsDirty();
    this.onlineDeliveryPartnerForm.get("password_confirmation").markAsDirty();
  }

  getDisplayName(dealer: any) {
    if (dealer) {
      return dealer.dealerName || dealer.dealer_legal_name;
    }
  }

  OnDealerSelect(event: any) {
    const dealerInfo = event.option.value;
    this.onlineDeliveryPartnerForm
      .get("external_id")
      .setValue(dealerInfo?.dealerCode);
    this.onlineDeliveryPartnerForm
      .get("mobile_number")
      .setValue(dealerInfo?.phone1);
    this.onlineDeliveryPartnerForm
      .get("delivery_partner")
      .get("dealer_legal_name")
      .setValue(dealerInfo?.dealerName);
  }

  toggleSelection(event: any) {
    const inHouseValue = event.checked ? 1 : 0;
    this.onlineDeliveryPartnerForm
      .get("delivery_partner")
      .get("in_house")
      .setValue(inHouseValue);
  }

  compareDealerObjects(object1: any, externalId: number) {
    return object1 && externalId && object1.dealerId === externalId;
  }

  goToDeliveryLocation() {
    this.redirectTo(AppRoutes.DELIVERY_LOCATION_PAGE);
  }
}
