import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { ApiUrls, AppRoutes, StorageKeys } from "@core/enums";
import { IPagination, IParameter } from "@core/interfaces";
import { ToggleUserAction, UserActionTypes } from "@core/store";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { IDownloadOptions } from "@shared/download";
import { IOnlineDeliveryPartner } from "@shared/interfaces";
import { LoadOnlineDeliveryPartnerAction } from "@shared/store";
import { LoadErpDataAction } from "@shared/store/actions/erp-dealers.actions";
import { Observable } from "rxjs";
import { IToggleOnlineDeliveryPartnerObj } from "../../interfaces";

@Component({
  selector: "app-online-delivery-partner-list-container",
  templateUrl: "./online-delivery-partner-list-container.component.html",
})
export class OnlineDeliveryPartnerListContainerComponent extends BaseComponent
  implements OnInit {
  onlineDeliveryPartnerList$: Observable<IOnlineDeliveryPartner[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  pagination$: Observable<IPagination>;
  erpLoading$: Observable<boolean>;
  downloadOptions: IDownloadOptions;
  page = 0;
  search = "";
  searchableField = "";

  constructor(
    private store: Store<any>,
    injector: Injector,
    toggleUserSuccess$: Actions,
    toggleUserFailure$: Actions
  ) {
    super(injector);
    toggleUserSuccess$
      .pipe(ofType(UserActionTypes.TOGGLE_USER_SUCCESS))
      .subscribe(() => {
        this.loadOnlineDeliveryPartner(this.getParam());
      });

    toggleUserFailure$
      .pipe(ofType(UserActionTypes.TOGGLE_USER_FAILURE))
      .subscribe(() => {
        this.loadOnlineDeliveryPartner(this.getParam());
      });
  }

  ngOnInit(): void {
    this.listenObservables();
    this.loadOnlineDeliveryPartner(this.getParam());
    this.setDownloadOptions();
  }

  setDownloadOptions() {
    this.downloadOptions = {
      resourceUrl: ApiUrls.ONLINE_DELIVERY_PARTNERS_EXPORT_TO_EXCEL,
      fileName: this.translateService.instant("online_delivery_partner"),
    };
  }

  listenObservables() {
    this.onlineDeliveryPartnerList$ = this.store.select(
      (store) => store.shared.onlineDeliveryPartners.list
    );
    this.loading$ = this.store.select(
      (store) => store.shared.onlineDeliveryPartners.loading
    );
    this.error$ = this.store.select(
      (store) => store.shared.onlineDeliveryPartners.error
    );
    this.pagination$ = this.store.select(
      (store) => store.shared.onlineDeliveryPartners.pagination
    );
    this.erpLoading$ = this.store.select(
      (store) => store.shared.erpDealers.erpLoading
    );
  }

  loadOnlineDeliveryPartner(param: IParameter) {
    this.store.dispatch(new LoadOnlineDeliveryPartnerAction(param));
  }

  onParamChange(param: IParameter) {
    this.page = param.page || param.page == 0 ? param.page : this.page;
    this.search =
      param.search || param.search === "" ? param.search : this.search;
    this.searchableField =
      param.searchable_field || param.searchable_field === ""
        ? param.searchable_field
        : this.searchableField;

    this.loadOnlineDeliveryPartner(this.getParam());
  }

  getParam() {
    return {
      paginate: 1,
      page: this.page,
      per_page: this.storage.get(StorageKeys.PER_PAGE),
      searchable_field: this.searchableField,
      search: this.search,
      status: -1,
    };
  }

  onToggleOnlineDeliveryPartner(
    toggleOnlineDeliveryPartnerObj: IToggleOnlineDeliveryPartnerObj
  ) {
    const param = {
      status: toggleOnlineDeliveryPartnerObj.value ? 1 : 0,
    };
    this.store.dispatch(
      new ToggleUserAction(toggleOnlineDeliveryPartnerObj.id, param)
    );
  }

  onOnlineDeliveryPartnerDetail(dealerId: number) {
    this.redirectTo(
      `${AppRoutes.DETAIL_ONLINE_DELIVERY_PARTNER_PAGE}/${dealerId}`
    );
  }

  onOnlineDeliveryPartnerEdit(dealerId: number) {
    this.redirectTo(
      `${AppRoutes.EDIT_ONLINE_DELIVERY_PARTNER_PAGE}/${dealerId}`
    );
  }

  onFetchFromErp() {
    const param = {
      type: "dealer",
    };
    this.store.dispatch(new LoadErpDataAction(param));
  }
}
