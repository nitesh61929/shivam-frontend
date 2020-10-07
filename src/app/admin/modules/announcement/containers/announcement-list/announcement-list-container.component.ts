import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes, StorageKeys } from "@core/enums";
import { IData, IPagination, IParameter } from "@core/interfaces";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AnnouncementListComponent } from "../../components";
import { IToggleAnnouncementObj } from "../../interfaces";
import { IAnnouncement } from "../../interfaces/announcement";
import {
  AnnouncementActionTypes,
  DeleteAnnouncementAction,
  LoadAnnouncementAction,
  ToggleAnnouncementAction,
} from "../../store/actions";

@Component({
  selector: "app-announcement-list-container",
  templateUrl: "./announcement-list-container.component.html",
})
export class AnnouncementListContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("announcementListCmp")
  announcementListCmp: AnnouncementListComponent;
  announcementList$: Observable<IAnnouncement[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  pagination$: Observable<IPagination>;
  announcementTypes$: Observable<IData[]>;

  page = 0;
  perPage: number;
  search = "";
  startsAt = "";
  endsAt = "";
  type = "";

  constructor(
    injector: Injector,
    private store: Store<any>,
    toggleAnnouncementSuccess$: Actions
  ) {
    super(injector);
    toggleAnnouncementSuccess$
      .pipe(ofType(AnnouncementActionTypes.TOGGLE_ANNOUNCEMENT_SUCCESS))
      .subscribe(() => {
        this.announcementListCmp.paginator.pageIndex = 0;
        this.page = 0;
        this.loadAnnouncement(this.getParam());
      });
  }

  ngOnInit(): void {
    this.announcementTypes$ = this.globalDatas.getAnnouncementTypes();
    this.announcementList$ = this.store.select(
      (store) => store.announcement.list
    );

    this.loading$ = this.store.select((store) => store.announcement.loading);
    this.error$ = this.store.select((store) => store.announcement.error);
    this.pagination$ = this.store.select(
      (store) => store.announcement.pagination
    );

    this.loadAnnouncement(this.getParam());
  }

  loadAnnouncement(param: IParameter) {
    this.store.dispatch(new LoadAnnouncementAction(param));
  }

  onParamChange(param: IParameter) {
    this.page = param.page || param.page === 0 ? param.page : this.page;
    this.perPage = this.storage.get(StorageKeys.PER_PAGE);
    this.search =
      param.search || param.search === "" ? param.search : this.search;
    this.startsAt =
      param.starts_at || param.starts_at === null
        ? param.starts_at
        : this.startsAt;
    this.endsAt =
      param.ends_at || param.ends_at === null ? param.ends_at : this.endsAt;
    this.type = param.type || param.type === "" ? param.type : this.type;

    this.loadAnnouncement(this.getParam(param));
  }

  getParam(parameter?: IParameter) {
    return {
      paginate: 1,
      status: -1,
      page: this.page,
      per_page: this.storage.get(StorageKeys.PER_PAGE),
      search: this.search,
      starts_at: this.startsAt,
      ends_at: this.endsAt,
      type: this.type,
    };
  }

  onEditAnnouncement(announcementId: number) {
    this.redirectTo(`${AppRoutes.ANNOUNCEMENT_UPDATE_PAGE}/${announcementId}`);
  }

  onDeleteAnnouncement(announcement: IAnnouncement) {
    if (announcement.status) {
      const infoMessage = this.translateService.instant("cannot_delete_msg");
      this.snackBar.open(infoMessage, "danger");
    } else {
      this.confirmDialog.open(this.getDeleteOptionsForDialog());

      this.confirmDialog.confirmed().subscribe((confirmed) => {
        if (confirmed) {
          this.store.dispatch(new DeleteAnnouncementAction(announcement.id));
        }
      });
    }
  }

  onAnnouncementDetail(announcementId: number) {
    this.redirectTo(`${AppRoutes.ANNOUNCEMENT_DETAIL_PAGE}/${announcementId}`);
  }

  onToggleAnnouncement(toggleAnnouncementObj: IToggleAnnouncementObj) {
    const statusObj = {
      status: toggleAnnouncementObj.value ? 1 : 0,
      notify: toggleAnnouncementObj.notify
        ? toggleAnnouncementObj.notify
        : false,
    };
    this.store.dispatch(
      new ToggleAnnouncementAction(
        toggleAnnouncementObj.announcementId,
        statusObj
      )
    );
  }
}
