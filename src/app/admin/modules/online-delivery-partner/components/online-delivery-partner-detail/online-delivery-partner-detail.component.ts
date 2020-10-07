import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { EOrderStatusClass } from "@app/admin/modules/order/enums";
import { BaseComponent } from "@core/components";
import { AppPermissions } from "@core/enums";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { IDealerAllocations } from "../../interfaces/dealer-allocations";

@Component({
  selector: "app-online-delivery-partner-detail",
  templateUrl: "./online-delivery-partner-detail.component.html",
})
export class OnlineDeliveryPartnerDetailComponent extends BaseComponent
  implements OnInit {
  @Output() backClick: EventEmitter<number> = new EventEmitter<number>();
  @Output() editDealer: EventEmitter<number> = new EventEmitter<number>();
  @Input() onlineDeliveryPartnerDetail$: Observable<any>;
  @Input() dealerAllocations$: Observable<IDealerAllocations[]>;
  onlineDeliveryPartnerDetail: any;
  dealerAllocations: IDealerAllocations;
  listLength: number;

  hasEditAccess = AppPermissions.EDIT_DEALER;

  constructor(injector: Injector) {
    super(injector);
  }
  displayedColumns: string[] = [
    "order_number",
    "customer_name",
    "amount",
    "date",
    "status",
  ];
  dataSource: IDealerAllocations[];

  ngOnInit(): void {
    this.onlineDeliveryPartnerDetail$.pipe(take(2)).subscribe((detail) => {
      this.onlineDeliveryPartnerDetail = detail;
    });

    this.dealerAllocations$.subscribe((allocations) => {
      this.dataSource = allocations;
      this.listLength = allocations ? allocations.length : null;
    });
  }

  getCustomerName(customer: any) {
    if (customer && (customer.first_name || customer.last_name)) {
      return `${customer.first_name} ${customer.last_name}`;
    }

    return "N/A";
  }

  getStatusClass(status: string) {
    if (status) {
      const lowerCaseStatus = status.toLowerCase();
      return EOrderStatusClass[lowerCaseStatus];
    }
  }

  onEditClick() {
    this.editDealer.emit(this.onlineDeliveryPartnerDetail.id);
  }

  onBackClick() {
    this.backClick.emit();
  }

  getDeliveryLocations(deliveryLoationList: any) {
    if (deliveryLoationList && deliveryLoationList.length > 0) {
      const nameArray = [];
      deliveryLoationList.forEach((deliveryLocation) => {
        nameArray.push(deliveryLocation.name);
      });
      return nameArray.join(", ");
    }
    return "N/A";
  }

  getAddress(onlineDeliveryPartnerDetail: any) {
    if (
      onlineDeliveryPartnerDetail &&
      onlineDeliveryPartnerDetail.details &&
      onlineDeliveryPartnerDetail.details.state
    ) {
      const detail = onlineDeliveryPartnerDetail.details;
      return `${detail.street}, ${detail.city}, ${detail.district}, ${detail.state}`;
    } else {
      return "N/A";
    }
  }
}
