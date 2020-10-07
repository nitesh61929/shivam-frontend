import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppPermissions } from "@core/enums";
import { Store } from "@ngrx/store";
import { IOnlineDeliveryPartner } from "@shared/interfaces";
import { OnlineDeliveryPartnerService } from "@shared/services";
import { Observable } from "rxjs";
import { debounceTime, finalize, switchMap, tap } from "rxjs/operators";
import { IOrder, IOrderCancelReason } from "../../interfaces";
import { AllocateOrderAction, RevokeOrderAction } from "../../store";

@Component({
  selector: "app-assign-dealer",
  templateUrl: "./assign-dealer.component.html",
})
export class AssignDealerComponent extends BaseComponent implements OnInit {
  @ViewChild(FormGroupDirective) assignDealerFormDirective;
  @Output() assignDealer: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelOrder: EventEmitter<IOrderCancelReason> = new EventEmitter<
    IOrderCancelReason
  >();
  @Input() onlineDeliveryPartners: any;
  @Input() orderDetail: IOrder;
  assignDealerForm: FormGroup;
  cancelOrderForm: FormGroup;
  revokeState = false;
  filteredOptions: Observable<any>;
  isLoading: boolean;
  hasCancelOrderAccess = AppPermissions.CANCEL_ORDER;

  constructor(
    injector: Injector,
    private store: Store<any>,
    private onlineDeliveryPartnerService: OnlineDeliveryPartnerService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.revokeState =
      this.orderDetail.status === "ALLOCATED" ||
      this.orderDetail.status === "CONFIRMED"
        ? true
        : false;
    this.setAssignDealerForm();
    this.buildAssignDealerForm();
    this.trackDealerChange();
    this.createCancelOrderForm();

    this.assignDealerForm
      .get("dealer")
      .valueChanges.pipe(
        debounceTime(300),
        tap(() => (this.isLoading = true)),
        switchMap((value) =>
          this.onlineDeliveryPartnerService
            .getOnlineDeliveryPartners({
              search: value,
            })
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe(
        (onlineDeliveryPartners) =>
          (this.filteredOptions = onlineDeliveryPartners.payload)
      );
  }

  checkAssignODPStatus(): boolean {
    let bool = false;
    if (
      this.orderDetail.status === "ALLOCATED" ||
      this.orderDetail.status === "PROCESSING" ||
      this.orderDetail.status === "CONFIRMED"
    ) {
      bool = true;
    }
    return bool;
  }

  buildAssignDealerForm() {
    if (this.revokeState) {
      const dealer = this.onlineDeliveryPartners.find(
        (dealerFromList) =>
          dealerFromList.id ===
          this.orderDetail.delivery_partner.delivery_partner_id
      );
      this.assignDealerForm.get("dealer").setValue(dealer);
    }
  }

  private setAssignDealerForm(): void {
    this.assignDealerForm = this.formBuilder.group({
      dealer: [
        { value: "", disabled: this.revokeState ? true : false },
        Validators.required,
      ],
      user_id: ["", Validators.required],
    });

    this.trackDealerChange();
  }

  private createCancelOrderForm() {
    this.cancelOrderForm = this.formBuilder.group({
      reason: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  private trackDealerChange() {
    this.assignDealerForm.get("dealer").valueChanges.subscribe((d) => {
      if (d) {
        this.assignDealerForm.get("user_id").setValue(d.id);
      }
    });
  }

  onAssignOrRevoke() {
    if (this.assignDealerForm.valid) {
      if (this.revokeState) {
        this.store.dispatch(
          new RevokeOrderAction(
            this.orderDetail.id,
            this.orderDetail.delivery_partner.allocation_id
          )
        );
      } else {
        this.store.dispatch(
          new AllocateOrderAction(
            this.orderDetail.id,
            this.assignDealerForm.value
          )
        );
      }
    }
  }

  getDisplayName(onlineDeliveryPartner: IOnlineDeliveryPartner) {
    if (
      onlineDeliveryPartner &&
      onlineDeliveryPartner.delivery_partner &&
      onlineDeliveryPartner.delivery_partner.dealer_legal_name
    ) {
      return onlineDeliveryPartner.delivery_partner.dealer_legal_name;
    }
  }

  checkAccess() {
    if (this.revokeState) {
      return AppPermissions.REVOKE_ORDER;
    } else {
      return AppPermissions.ALLOCATE_ORDER;
    }
  }

  getBtnLabel() {
    if (this.revokeState) {
      return this.translateService.instant("revoke_label");
    } else {
      return this.translateService.instant("assign_label");
    }
  }

  getTitle() {
    if (this.revokeState) {
      return this.translateService.instant("revoke_online_delivery_partner");
    } else {
      return this.translateService.instant("assign_online_delivery_partner");
    }
  }

  getClass() {
    if (this.revokeState) {
      return "theme-error";
    } else {
      return "theme-alternate";
    }
  }

  getIconName() {
    if (this.revokeState) {
      return "REVOKE";
    } else {
      return "ASSIGN";
    }
  }

  onCancelOrder() {
    if (this.cancelOrderForm.valid) {
      const options = {
        title: this.translateService.instant("cancel_orders"),
        message: this.translateService.instant("cance_order_message"),
        cancelText: this.translateService.instant("cancel_label"),
        confirmText: this.translateService.instant("cancel_orders"),
      };
      this.confirmDialog.open(options);

      this.confirmDialog.confirmed().subscribe((confirmed) => {
        if (confirmed) {
          this.cancelOrder.emit(this.cancelOrderForm.value);
        }
      });
    }
  }

  checkStatusForCancelOrder() {
    let bool = false;
    if (
      this.orderDetail.status === "PROCESSING" &&
      this.orderDetail.payment &&
      this.orderDetail.payment.payment_method &&
      this.orderDetail.payment.payment_method.title.toLowerCase() ===
        "cash on delivery"
    ) {
      bool = true;
    } else if (this.orderDetail.status === "UNPAID") {
      bool = true;
    }
    return bool;
  }
}
