import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { BaseComponent } from "@core/components";
import { AppPermissions } from "@core/enums";
import { IToggleObj } from "@shared/interfaces";
import { IToggleOptions } from "@shared/toggle/interfaces";
import { Observable } from "rxjs";
import { IPayment } from "../../interfaces";

@Component({
  selector: "app-payment-list",
  templateUrl: "./payment-list.component.html",
})
export class PaymentListComponent extends BaseComponent implements OnInit {
  @Output() togglePaymentMethod: EventEmitter<IToggleObj> = new EventEmitter<
    IToggleObj
  >();
  @Input() paymentMethods$: Observable<IPayment[]>;
  toggleOptions: IToggleOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  displayedColumns: string[] = ["title", "status"];
  dataSource: MatTableDataSource<IPayment>;

  ngOnInit(): void {
    this.setToggleOptions();

    this.paymentMethods$.subscribe((paymentMethods: IPayment[]) => {
      this.dataSource = new MatTableDataSource(paymentMethods);
    });
  }

  setToggleOptions() {
    this.toggleOptions = {
      title: this.translateService.instant("publish_unpublish"),
      message: this.translateService.instant("update_status_confirmation_msg"),
      cancelLabel: this.translateService.instant("cancel_label"),
      confirmLabel: this.translateService.instant("confirm_label"),
      activeLabel: this.translateService.instant("published"),
      inactiveLabel: this.translateService.instant("unpublished"),
      hasAccess: AppPermissions.UPDATE_PAYMENT,
    };
  }

  onToggleStatus(toggleStatus: boolean, id: number) {
    const togglePaymentObj = {
      id,
      value: toggleStatus,
    };
    this.togglePaymentMethod.emit(togglePaymentObj);
  }

  getToggleValue(status: number) {
    return status === 1 ? true : false;
  }
}
