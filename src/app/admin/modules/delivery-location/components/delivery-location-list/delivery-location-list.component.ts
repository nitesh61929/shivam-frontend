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
import { IDeliveryLocation } from "@shared/interfaces";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-delivery-location-list",
  templateUrl: "./delivery-location-list.component.html",
})
export class DeliveryLocationListComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() editDeliveryLocation: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() deleteDeliveryLocation: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() deliveryLocationDetail: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() deliveryLocations$: Observable<IDeliveryLocation[]>;
  @Input() error$: Error;
  @Input() pagination$: Observable<IPagination>;
  @Input() downloadOptions: IDownloadOptions;
  @Input() parameters: IParameter;
  listLength: number;
  hasDownloadAccess = AppPermissions.EXPORT_DELIVERY_LOCATION;

  constructor(injector: Injector) {
    super(injector);
  }

  displayedColumns: string[] = [
    "location_area",
    "state",
    "district",
    "delivery_charges",
    "action",
  ];
  dataSource: MatTableDataSource<IDeliveryLocation>;
  actions: IAction[] = [
    { name: "detail", hasAccess: AppPermissions.VIEW_DELIVERY_LOCATION },
    { name: "edit", hasAccess: AppPermissions.EDIT_DELIVERY_LOCATION },
    { name: "delete", hasAccess: AppPermissions.DELETE_DELIVERY_LOCATION },
  ];

  ngOnInit(): void {
    this.deliveryLocations$.subscribe((deliveryLocations) => {
      this.dataSource = new MatTableDataSource(deliveryLocations);
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

  onActionClick(action: string, deliveryLocationId: number) {
    switch (action) {
      case "edit": {
        this.editDeliveryLocation.emit(deliveryLocationId);
        break;
      }

      case "delete": {
        this.paginator.pageIndex = 0;
        this.deleteDeliveryLocation.emit(deliveryLocationId);
        break;
      }

      case "detail": {
        this.deliveryLocationDetail.emit(deliveryLocationId);
        break;
      }
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
