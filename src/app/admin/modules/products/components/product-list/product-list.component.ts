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
import { AppPermissions, EModuleAllocation, StorageKeys } from "@core/enums";
import { IPagination } from "@core/interfaces";
import { Store } from "@ngrx/store";
import { IAction } from "@shared/actions";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IProduct } from "../../interfaces";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
})
export class ProductListComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @Output() productEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() productDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() productDetail: EventEmitter<number> = new EventEmitter<number>();
  @Output() paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() products$: Observable<Array<IProduct>>;
  @Input() pagination$: Observable<IPagination>;
  dataSource: MatTableDataSource<IProduct>;
  listLength: number;
  actions: IAction[] = [
    { name: "detail", hasAccess: AppPermissions.VIEW_PRODUCT },
    { name: "edit", hasAccess: AppPermissions.EDIT_PRODUCT },
    { name: "delete", hasAccess: AppPermissions.DELETE_PRODUCT },
  ];
  moduleAllocationEnum = EModuleAllocation;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  displayedColumns: string[] = [
    "product_name",
    "allocated_to",
    "min_qty",
    "max_qty",
    "action",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("searchInput") searchInput: ElementRef;

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
              paginate: 1,
              page: this.paginator.pageIndex,
              per_page: this.storage.get(StorageKeys.PER_PAGE),
              search: "",
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
        paginate: 1,
        page: this.paginator.pageIndex,
        per_page: this.storage.get(StorageKeys.PER_PAGE),
        search: searchValue,
      };
      this.paramChanged.emit(param);
    }
  }

  ngOnInit(): void {
    this.products$.subscribe((products) => {
      this.dataSource = new MatTableDataSource(products);
    });

    this.pagination$.subscribe((pagination) => {
      this.listLength = pagination ? pagination.total : null;
    });
  }

  onActionClick(action: string, productId: number) {
    switch (action) {
      case "edit": {
        this.productEdit.emit(productId);
        break;
      }

      case "delete": {
        this.paginator.pageIndex = 0;
        this.productDelete.emit(productId);
        break;
      }

      case "detail": {
        this.productDetail.emit(productId);
        break;
      }
    }
  }
}
