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
import { MatSelectChange } from "@angular/material/select";
import { MatTableDataSource } from "@angular/material/table";
import { BaseComponent } from "@core/components";
import { AppPermissions, StorageKeys } from "@core/enums";
import { AppRoles } from "@core/enums/app-roles";
import { IData, IPagination } from "@core/interfaces";
import { IAction } from "@shared/actions";
import { IDateRangeObj } from "@shared/date-range/interfaces";
import { ToggleComponent } from "@shared/toggle";
import { IToggleOptions } from "@shared/toggle/interfaces";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import DateUtilities from "../../../../../core/utilities/date-utilities";
import { IToggleAnnouncementObj } from "../../interfaces";
import { IAnnouncement } from "../../interfaces/announcement";

export interface IIntendedFor {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-announcement-list",
  templateUrl: "./announcement-list.component.html",
})
export class AnnouncementListComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("toggleCmp") toggleCmp: ToggleComponent;
  @Output() paramChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() announcementEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() announcementDelete: EventEmitter<any> = new EventEmitter<number>();
  @Output() announcementDetail: EventEmitter<number> = new EventEmitter<
    number
  >();
  @Output() toggleAnnouncement: EventEmitter<
    IToggleAnnouncementObj
  > = new EventEmitter<IToggleAnnouncementObj>();
  @Input() announcementList$: Observable<IAnnouncement[]>;
  @Input() pagination$: Observable<IPagination>;
  @Input() announcementTypes$: Observable<IData[]>;
  sendNotification: boolean;
  announcementTypes: IData[];
  dataSource = new MatTableDataSource<IAnnouncement>();
  listLength: number;
  actions: IAction[] = [
    { name: "detail", hasAccess: AppPermissions.VIEW_ANNOUNCEMENT },
    { name: "edit", hasAccess: AppPermissions.EDIT_ANNOUNCEMENT },
    { name: "delete", hasAccess: AppPermissions.DELETE_ANNOUNCEMENT },
  ];
  toggleOptions: IToggleOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  displayedColumns: string[] = [
    "title",
    "type",
    "intended_for",
    "start_date",
    "end_date",
    "action",
  ];

  ngOnInit(): void {
    this.listenObservables();
    this.setToggleOptions();
  }

  listenObservables() {
    this.announcementList$.subscribe((announcementList) => {
      this.dataSource = new MatTableDataSource(announcementList);
    });

    this.pagination$.subscribe((pagination) => {
      this.listLength = pagination ? pagination.total : null;
    });

    this.announcementTypes$.pipe(take(1)).subscribe((announcementTypes) => {
      this.announcementTypes = announcementTypes;
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
      hasAccess: AppPermissions.UPDATE_ANNOUNCMENT_STATUS,
      showCheckBox: true,
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

  onSearch(searchValue: string) {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
      const param = {
        paginate: 1,
        page: this.paginator.pageIndex,
        per_page: this.paginator.pageSize,
        search: searchValue,
      };
      this.paramChanged.emit(param);
    }
  }

  getIntendedFor(intendedFor: boolean) {
    return intendedFor
      ? AppRoles.CONSUMER_TEXT
      : AppRoles.ONLINE_DELIVERY_PARTNER_TEXT;
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

  onTypeChange(typeChange: MatSelectChange) {
    this.paginator.pageIndex = 0;
    const param = {
      page: this.paginator.pageIndex,
      type: typeChange.value,
    };
    this.paramChanged.emit(param);
  }

  onActionClick(action: string, announcement: IAnnouncement) {
    switch (action) {
      case "edit": {
        this.announcementEdit.emit(announcement.id);
        break;
      }

      case "delete": {
        this.paginator.pageIndex = 0;
        this.announcementDelete.emit(announcement);
        break;
      }

      case "detail": {
        this.announcementDetail.emit(announcement.id);
        break;
      }
    }
  }

  onToggleStatus(toggleStatus: boolean, announcementId: number) {
    if (!toggleStatus) {
      this.sendNotification = false;
    }
    const toggleAnnouncementObj = {
      announcementId,
      value: toggleStatus,
      notify: this.sendNotification,
    };
    this.toggleAnnouncement.emit(toggleAnnouncementObj);
  }

  onCheckboxChange(isChecked: boolean) {
    this.sendNotification = isChecked;
  }

  getToggleValue(status: number) {
    return status === 1 ? true : false;
  }

  isExpired(announcement: IAnnouncement) {
    if (announcement.ends_at) {
      const formattedEndDate = DateUtilities.convertDateTImeFormat(
        announcement.ends_at,
        "YYYY-MM-DD"
      );
      const today = DateUtilities.getday("today", "YYYY-MM-DD");
      return formattedEndDate < today ? true : false;
    }
  }
}
