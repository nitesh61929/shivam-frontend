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
import { IPermissions } from "@core/interfaces/permission";
import { IAction } from "@shared/actions";
import { IDownloadOptions } from "@shared/download";
import { IToggleOptions } from "@shared/toggle/interfaces";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IBackendOperator, IToggleBackendOperatorObj } from "../../interfaces";

@Component({
  selector: "app-backend-operator-list",
  templateUrl: "./backend-operator-list.component.html",
})
export class BackendOperatorListComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() backendOperatorEdit: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() backendOperatorDetail: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() toggleBackendOperator: EventEmitter<
    IToggleBackendOperatorObj
  > = new EventEmitter<IToggleBackendOperatorObj>();
  @Input() backendOperatorList$: Observable<IBackendOperator[]>;
  @Input() pagination$: Observable<IPagination>;
  @Input() downloadOptions: IDownloadOptions;
  @Input() parameters: IParameter;
  listLength: number;
  actions: IAction[] = [
    { name: "detail", hasAccess: AppPermissions.VIEW_BACKEND_OPERATOR },
    { name: "edit", hasAccess: AppPermissions.EDIT_BACKEND_OPERATOR },
  ];
  displayedColumns: string[] = [
    "first_name",
    "last_name",
    "mobile",
    "email",
    "username",
    "modules_accessible",
    "action",
  ];
  dataSource: MatTableDataSource<IBackendOperator>;
  hasDownloadAccess = AppPermissions.DOWNLOAD_BACKEND_OPERATOR;
  toggleOptions: IToggleOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.listenObservables();
    this.setToggleOptions();
  }

  listenObservables() {
    this.backendOperatorList$.subscribe((backEndOperatorList) => {
      this.dataSource = new MatTableDataSource(backEndOperatorList);
    });

    this.pagination$.subscribe((pagination) => {
      this.listLength = pagination ? pagination.total : null;
    });
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
      hasAccess: AppPermissions.ACTIVATE_DEACTIVATE_BACKEND_OPERATOR,
    };
  }

  ngAfterViewInit() {
    this.trackPaginator();
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

  onActionClick(action: string, operatorId: number) {
    switch (action) {
      case "edit": {
        this.backendOperatorEdit.emit(operatorId);
        break;
      }

      case "detail": {
        this.backendOperatorDetail.emit(operatorId);
        break;
      }
    }
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

  getAccessibleModules(permissions: IPermissions) {
    const modules = [];
    if (permissions) {
      Object.entries(permissions).forEach(([key, values]) => {
        modules.push(this.translateService.instant(key.toLowerCase()));
      });
    }
    return modules.join(", ");
  }

  onToggleStatus(toggleStatus: boolean, backendOperatorId) {
    const toggleBackendOperatorObj = {
      backendOperatorId,
      value: toggleStatus,
    };
    this.toggleBackendOperator.emit(toggleBackendOperatorObj);
  }

  getToggleValue(status: number) {
    return status === 1 ? true : false;
  }
}
