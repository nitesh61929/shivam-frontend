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
import { IPagination, IParameter, IUser } from "@core/interfaces";
import CommonUtilities from "@core/utilities/common-utilities";
import { IAction } from "@shared/actions";
import { IDownloadOptions } from "@shared/download";
import { IToggleOptions } from "@shared/toggle/interfaces";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IToggleConsumerObj } from "../../interfaces";

@Component({
  selector: "app-consumers-list",
  templateUrl: "./consumers-list.component.html",
  styles: [],
})
export class ConsumersListComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() consumerDetail: EventEmitter<number> = new EventEmitter<number>();
  @Output() consumerEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() toggleConsumer: EventEmitter<IToggleConsumerObj> = new EventEmitter<
    IToggleConsumerObj
  >();
  @Input() userList$: Observable<IUser[]>;
  @Input() pagination$: Observable<IPagination>;
  @Input() downloadOptions: IDownloadOptions;
  @Input() parameters: IParameter;
  hasDownloadAccess = AppPermissions.EXPORT_CONSUMER;
  listLength: number;
  toggleOptions: IToggleOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  displayedColumns: string[] = [
    "name",
    "address",
    "contact",
    "email_id",
    "actions",
  ];
  dataSource: MatTableDataSource<IUser>;

  actions: IAction[] = [
    { name: "detail", hasAccess: AppPermissions.VIEW_CONSUMER },
    { name: "edit", hasAccess: AppPermissions.EDIT_CONSUMER },
  ];

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
    this.listenObservables();
    this.setToggleOptions();
  }

  listenObservables() {
    this.userList$.subscribe((userList) => {
      this.dataSource = new MatTableDataSource(userList);
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
      hasAccess: AppPermissions.ACTIVATE_DEACTIVATE_CONSUMER,
    };
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

  onToggleStatus(toggleStatus: boolean, consumerId: number) {
    const toggleConsumerObj = {
      consumerId,
      value: toggleStatus,
    };
    this.toggleConsumer.emit(toggleConsumerObj);
  }

  getToggleValue(status: number) {
    return status === 1 ? true : false;
  }

  onActionClick(action: string, consumerId: number) {
    switch (action) {
      case "edit": {
        this.consumerEdit.emit(consumerId);
        break;
      }

      case "detail": {
        this.consumerDetail.emit(consumerId);
        break;
      }
    }
  }

  getAddress(address: any) {
    const mappedAddress = CommonUtilities.getAddress(address);
    if (mappedAddress === null) {
      return "N/A";
    }
    return CommonUtilities.getAddress(address);
  }
}
