import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { ApiUrls, AppRoutes, StorageKeys } from "@core/enums";
import { IPagination, IParameter, IUser } from "@core/interfaces";
import { LoadUserAction, ToggleUserAction } from "@core/store";
import { Store } from "@ngrx/store";
import { IDownloadOptions } from "@shared/download";
import { Observable } from "rxjs";
import { IToggleConsumerObj } from "../../interfaces";

@Component({
  selector: "app-consumers-list-container",
  templateUrl: "./consumers-list-container.component.html",
})
export class ConsumersListContainerComponent extends BaseComponent
  implements OnInit {
  userList$: Observable<IUser[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  pagination$: Observable<IPagination>;
  downloadOptions: IDownloadOptions;
  parameters: IParameter;
  page = 0;
  search = "";
  status: string | number = "";

  constructor(private store: Store<any>, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.userList$ = this.store.select((store) => store.core.user.list);
    this.loading$ = this.store.select((store) => store.core.user.loading);
    this.error$ = this.store.select((store) => store.core.user.error);
    this.pagination$ = this.store.select((store) => store.core.user.pagination);

    this.loadConsumer(this.getParam());
    this.setDownloadOptions();
  }

  setDownloadOptions() {
    this.downloadOptions = {
      resourceUrl: ApiUrls.USERS_EXPORT_TO_EXCEL,
      fileName: this.translateService.instant("consumers"),
    };
  }

  loadConsumer(param: IParameter) {
    this.store.dispatch(new LoadUserAction(param));
  }

  onParamChange(param: IParameter) {
    this.page = param.page || param.page == 0 ? param.page : this.page;
    this.search =
      param.search || param.search === "" ? param.search : this.search;
    this.status =
      param.status || param.status === "" ? param.status : this.status;

    this.loadConsumer(this.getParam());
  }

  getParam() {
    return {
      paginate: 1,
      page: this.page,
      per_page: this.storage.get(StorageKeys.PER_PAGE),
      search: this.search,
      role: "consumer",
      status: -1,
    };
  }

  onConsumerDetail(consumerId: number) {
    this.redirectTo(`${AppRoutes.DETAIL_CONSUMER_PAGE}/${consumerId}`);
  }

  onToggleConsumer(toggleConsumerObj: IToggleConsumerObj) {
    const param = {
      status: toggleConsumerObj.value ? 1 : 0,
    };
    this.store.dispatch(
      new ToggleUserAction(toggleConsumerObj.consumerId, param)
    );
  }

  onEditConsumer(consumerId: number) {
    this.redirectTo(`${AppRoutes.EDIT_CONSUMER_PAGE}/${consumerId}`);
  }
}
