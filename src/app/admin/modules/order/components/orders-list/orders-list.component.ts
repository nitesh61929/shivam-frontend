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
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSelectChange } from "@angular/material/select";
import { MatTableDataSource } from "@angular/material/table";
import { BaseComponent } from "@core/components";
import { AppPermissions, StorageKeys } from "@core/enums";
import { IData, IPagination, IParameter } from "@core/interfaces";
import { IAction } from "@shared/actions";
import { IDateRangeObj } from "@shared/date-range/interfaces";
import { IDownloadOptions } from "@shared/download";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { EOrderStatusClass } from "../../enums";
import { IOrder } from "../../interfaces";

@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
})
export class OrdersListComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() orderDetail: EventEmitter<number> = new EventEmitter<number>();
  @Output() paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() orderList$: Observable<IOrder[]>;
  @Input() pagination$: Observable<IPagination>;
  @Input() orderStatuses$: Observable<IData[]>;
  @Input() grandTotal$: Observable<number>;
  @Input() downloadOptions: IDownloadOptions;
  @Input() parameters: IParameter;
  orderStatuses: IData[];
  listLength: number;
  displayedColumns: string[] = [
    "order_id",
    "customer_name",
    "dealer",
    "date",
    "amount",
    "status",
    "action",
  ];
  dataSource: MatTableDataSource<IOrder>;
  actions: IAction[] = [
    { name: "detail", hasAccess: AppPermissions.VIEW_ORDER },
  ];
  hasDownloadAccess = AppPermissions.EXPORT_ORDER;
  statusFilterFormGroup: FormGroup;

  constructor(injector: Injector) {
    super(injector);
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

  ngOnInit(): void {
    this.orderList$.subscribe((userList) => {
      this.dataSource = new MatTableDataSource(userList);
    });

    this.pagination$.subscribe((pagination) => {
      this.listLength = pagination ? pagination.total : null;
    });

    this.orderStatuses$.pipe(take(1)).subscribe((orderStatuses) => {
      this.orderStatuses = orderStatuses;
    });

    this.statusFilterFormGroup = this.formBuilder.group({
      statusFormControl: [],
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

  onActionClick(action: string, orderId: number) {
    switch (action) {
      case "detail": {
        this.orderDetail.emit(orderId);
        break;
      }
    }
  }

  getStatusClass(status: string) {
    if (status) {
      const lowerCaseStatus = status.toLowerCase();
      return EOrderStatusClass[lowerCaseStatus];
    }
  }

  onDateRangeSelect(dateRangeObj: IDateRangeObj) {
    this.paginator.pageIndex = 0;
    const param = {
      page: this.paginator.pageIndex,
      starts_at: dateRangeObj.startDate,
      ends_at: dateRangeObj.endDate,
    };
    this.paramChanged.emit(param);
  }

  onStatusChange(statusChange: MatSelectChange) {
    this.paginator.pageIndex = 0;
    const param = {
      page: this.paginator.pageIndex,
      status: statusChange.value,
    };
    this.paramChanged.emit(param);
  }

  getOrderStatusesValues(orderStatuses: any) {
    const arr = [];
    if (orderStatuses) {
      orderStatuses.forEach((order) => {
        arr.push(order.value);
      });
    }

    return arr;
  }

  onToggle() {
    const param = {
      page: this.paginator.pageIndex,
      status:
        this.statusFilterFormGroup.get("statusFormControl").value.length > 0
          ? this.statusFilterFormGroup.get("statusFormControl").value
          : "",
    };
    this.paramChanged.emit(param);
  }
}
