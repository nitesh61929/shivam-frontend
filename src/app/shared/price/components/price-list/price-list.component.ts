import {
  AfterViewInit,
  Component,
  ElementRef,
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
import { IPrice } from "@shared/price";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-price-list",
  templateUrl: "./price-list.component.html",
})
export class PriceListComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("searchInput") searchInput: ElementRef;
  @Output() priceEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() priceDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() prices$: Observable<IPrice[]>;
  @Input() pagination$: Observable<IPagination>;
  @Input() downloadOptions: IDownloadOptions;
  @Input() parameters: IParameter;
  listLength: number;
  actions: IAction[] = [
    { name: "edit", hasAccess: AppPermissions.EDIT_PRICE },
    { name: "delete", hasAccess: AppPermissions.DELETE_PRICE },
  ];
  hasDownloadAccess = AppPermissions.EXPORT_PRICES;
  displayedColumns: string[] = [
    "delivery_location_name",
    "price",
    "unit",
    "discount_amount",
    "foc",
    "foc_eligible_qty",
    "action",
  ];
  dataSource: MatTableDataSource<IPrice>;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.prices$.subscribe((list) => {
      this.listLength = list ? list.length : 0;
      this.dataSource = new MatTableDataSource(list);
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

  onActionClicked(action: string, priceId: number) {
    switch (action) {
      case "edit": {
        this.priceEdit.emit(priceId);
        break;
      }

      case "delete": {
        this.priceDelete.emit(priceId);
        break;
      }
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
}
