import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { BaseComponent } from "@core/components";
import { AppPermissions, StorageKeys } from "@core/enums";
import { IPagination, IParameter } from "@core/interfaces";
import { IAction } from "@shared/actions";
import { IDownloadOptions } from "@shared/download";
import { IOnlineDeliveryPartner } from "@shared/interfaces";
import { IToggleOptions } from "@shared/toggle/interfaces";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IToggleOnlineDeliveryPartnerObj } from "../../interfaces";
import { IDeliverLocation } from "../../interfaces/delivery-location";

@Component({
  selector: "app-online-delivery-partner-list",
  templateUrl: "./online-delivery-partner-list.component.html",
})
export class OnlineDeliveryPartnerListComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleOnlineDeliveryPartner: EventEmitter<
    IToggleOnlineDeliveryPartnerObj
  > = new EventEmitter<IToggleOnlineDeliveryPartnerObj>();
  @Output() onlineDeliveryPartnerDetail: EventEmitter<
    number
  > = new EventEmitter<number>();
  @Output() onlineDeliveryPartnerEdit: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Input() onlineDeliveryPartnerList$: Observable<IOnlineDeliveryPartner[]>;
  @Output() fetchFromErp: EventEmitter<null> = new EventEmitter<null>();
  @Input() pagination$: Observable<IPagination>;
  @Input() erpLoading$: Observable<boolean>;
  @Input() downloadOptions: IDownloadOptions;
  @Input() parameters: IParameter;
  listLength: number;
  hasDownloadAccess = AppPermissions.DOWNLOAD_ONLINE_DELIVERY_PARTNER;
  displayedColumns: string[] = [
    "dealer_name",
    "owner_name",
    "contact",
    "delivery_location",
    "action",
  ];
  dataSource: MatTableDataSource<IOnlineDeliveryPartner>;
  hasToggleAccess = AppPermissions.ACTIVATE_DEACTIVATE_DEALER;
  actions: IAction[] = [
    { name: "detail", hasAccess: AppPermissions.VIEW_DEALER },
    { name: "edit", hasAccess: AppPermissions.EDIT_DEALER },
  ];
  toggleOptions: IToggleOptions;
  hasFetchAccess = AppPermissions.FETCH_ERP_DATA;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.listenObservables();
    this.setToggleOptions();
  }

  setToggleOptions() {
    this.toggleOptions = {
      title: this.translateService.instant("active_deactive_user"),
      message: this.translateService.instant(
        "active_deactive_confirmation_msg"
      ),
      cancelLabel: this.translateService.instant("cancel_label"),
      confirmLabel: this.translateService.instant("confirm_label"),
      activeLabel: this.translateService.instant("active"),
      inactiveLabel: this.translateService.instant("deactive"),
      hasAccess: AppPermissions.ACTIVATE_DEACTIVATE_DEALER,
    };
  }

  listenObservables() {
    this.onlineDeliveryPartnerList$.subscribe((onlineDeliveryPartnerList) => {
      this.dataSource = new MatTableDataSource(onlineDeliveryPartnerList);
    });

    this.pagination$.subscribe((pagination) => {
      this.listLength = pagination ? pagination.total : null;
    });
  }

  ngAfterViewInit() {
    this.trackPaginator();
  }

  trackPaginator() {
    if (this.paginator) {
      this.paginator.page
        .pipe(
          tap(() => {
            this.storage.set(StorageKeys.PER_PAGE, this.paginator.pageSize);
            const param = {
              page: this.paginator.pageIndex,
            };
            this.paramChanged.emit(param);
          })
        )
        .subscribe();
    }
  }

  onSearch(searchValue: string) {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
      const param = {
        page: this.paginator.pageIndex,
        search: searchValue,
      };
      this.paramChanged.emit(param);
    }
  }

  onToggleStatus(toggleStatus: boolean, onlineDeliveryPartnerId: number) {
    const toggleDealerObj = {
      id: onlineDeliveryPartnerId,
      value: toggleStatus,
    };
    this.toggleOnlineDeliveryPartner.emit(toggleDealerObj);
  }

  getToggleValue(status: number) {
    return status === 1 ? true : false;
  }

  onActionClick(action: string, dealerId: number) {
    switch (action) {
      case "edit": {
        this.onlineDeliveryPartnerEdit.emit(dealerId);
        break;
      }

      case "detail": {
        this.onlineDeliveryPartnerDetail.emit(dealerId);
        break;
      }
    }
  }

  onFetchFromErp() {
    this.fetchFromErp.emit();
  }

  getDeliveryLocations(deliveryLoationList: IDeliverLocation[]) {
    if (deliveryLoationList && deliveryLoationList.length > 0) {
      const nameArray = [];
      deliveryLoationList.forEach((deliveryLocation) => {
        nameArray.push(deliveryLocation.name);
      });
      return nameArray.join(", ");
    }
    return "N/A";
  }
}
