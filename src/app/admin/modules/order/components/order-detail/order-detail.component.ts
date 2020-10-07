import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { BaseComponent } from "@core/components";
import { AppPermissions, AppRoutes } from "@core/enums";
import { IOnlineDeliveryPartner } from "@shared/interfaces";
import { IPageHeaderOptions } from "@shared/page-header";
import { EOrderStatusClass } from "../../enums";
import { IOrder, IOrderCancelReason } from "../../interfaces";
import { IOrderLines } from "../../interfaces/order-lines";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
})
export class OrderDetailComponent extends BaseComponent implements OnInit {
  @Output() assignDealer: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelOrder: EventEmitter<IOrderCancelReason> = new EventEmitter<
    IOrderCancelReason
  >();
  @Input() onlineDeliveryPartners: IOnlineDeliveryPartner[];
  @Input() orderDetail: IOrder;
  myControl = new FormControl();
  pageHeaderOptions: IPageHeaderOptions;
  displayedColumns: string[] = [
    "product_name",
    "quantity",
    "rate",
    "discount",
    "amount",
  ];
  dataSource: MatTableDataSource<IOrderLines>;
  allocateOrderAccess = AppPermissions.ALLOCATE_ORDER;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.orderDetail.orderLines);
    this.setPageHeaderOptions();
  }

  setPageHeaderOptions() {
    this.pageHeaderOptions = {
      title: this.translateService.instant("order_detail_label"),
      showAddBtn: false,
    };
  }

  onDealerAssign(assignDelaerForm: FormGroup) {
    this.assignDealer.emit(assignDelaerForm);
  }

  getStatusClass(status: string) {
    const lowerCaseStatus = status.toLowerCase();
    return EOrderStatusClass[lowerCaseStatus];
  }

  getSubTotal(orderDetail) {
    return orderDetail.grand_total - orderDetail.vat_total;
  }

  checkStatus(): boolean {
    let bool = false;
    if (
      this.orderDetail.status === "ALLOCATED" ||
      this.orderDetail.status === "PROCESSING" ||
      this.orderDetail.status === "UNPAID" ||
      this.orderDetail.status === "CONFIRMED"
    ) {
      bool = true;
    }
    return bool;
  }

  onBackClick() {
    this.redirectTo(AppRoutes.ORDERS_PAGE);
  }

  /**
   * get name to display in feedback
   */
  getNameForFeedback(feedbackDetail: any): string {
    if (feedbackDetail) {
      if (feedbackDetail.business_name) {
        return feedbackDetail.business_name;
      } else {
        if (feedbackDetail.billing_name) {
          return feedbackDetail.billing_name;
        } else {
          return `${feedbackDetail.first_name} ${feedbackDetail.last_name} `;
        }
      }
    }
    return "";
  }

  showAllocatedTo(orderDetail: any) {
    if (
      orderDetail?.delivery_partner &&
      orderDetail?.delivery_partner?.business_name
    ) {
      if (
        orderDetail.status.toLowerCase() === "confirmed" ||
        orderDetail.status.toLowerCase() === "delivered" ||
        orderDetail.status.toLowerCase() === "completed" ||
        orderDetail.status.toLowerCase() === "allocated"
      ) {
        return true;
      }
    }
    return false;
  }

  getEmail(orderDetail: any) {
    if (orderDetail) {
      return orderDetail.billing_email
        ? orderDetail.billing_email
        : orderDetail.email;
    }
  }

  onCancelOrder(cancelReason: IOrderCancelReason) {
    this.cancelOrder.emit(cancelReason);
  }
}
