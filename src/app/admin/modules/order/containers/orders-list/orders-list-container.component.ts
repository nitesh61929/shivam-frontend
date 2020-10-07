import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { ApiUrls, AppRoutes, StorageKeys } from "@core/enums";
import { IData, IPagination, IParameter } from "@core/interfaces";
import { Store } from "@ngrx/store";
import { IDownloadOptions } from "@shared/download";
import { Observable } from "rxjs";
import { IOrder } from "../../interfaces";
import { LoadOrderAction } from "../../store/actions";

@Component({
  selector: "app-orders-list-container",
  templateUrl: "./orders-list-container.component.html",
})
export class OrdersListContainerComponent extends BaseComponent
  implements OnInit {
  orderList$: Observable<IOrder[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  pagination$: Observable<IPagination>;
  orderStatuses$: Observable<IData[]>;
  grandTotal$: Observable<number>;
  downloadOptions: IDownloadOptions;
  page = 0;
  perPage = 5;
  search = "";
  startsAt = "";
  endsAt = "";
  status: string | number = "";

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.orderStatuses$ = this.globalDatas.getOrderStatuses();
    this.orderList$ = this.store.select((store) => store.order.list);
    this.loading$ = this.store.select((store) => store.order.loading);
    this.error$ = this.store.select((store) => store.order.error);
    this.pagination$ = this.store.select((store) => store.order.pagination);
    this.grandTotal$ = this.store.select((store) => store.order.grand_total);

    this.loadOrder(this.getParam());
    this.setDownloadOptions();
  }

  setDownloadOptions() {
    this.downloadOptions = {
      resourceUrl: ApiUrls.ORDERS_EXPORT_TO_EXCEL,
      fileName: this.translateService.instant("orders"),
    };
  }

  loadOrder(param: IParameter) {
    this.store.dispatch(new LoadOrderAction(param));
  }

  onParamChange(param: IParameter) {
    this.page = param.page || param.page == 0 ? param.page : this.page;
    this.perPage = this.storage.get(StorageKeys.PER_PAGE);
    this.search =
      param.search || param.search === "" ? param.search : this.search;
    this.startsAt =
      param.starts_at || param.starts_at === null
        ? param.starts_at
        : this.startsAt;
    this.endsAt =
      param.ends_at || param.ends_at === null ? param.ends_at : this.endsAt;
    this.status =
      param.status || param.status === "" ? param.status : this.status;

    this.loadOrder(this.getParam(param));
  }

  getParam(parameter?: IParameter) {
    return {
      paginate: 1,
      page: this.page,
      per_page: this.storage.get(StorageKeys.PER_PAGE),
      search: this.search,
      starts_at: this.startsAt,
      ends_at: this.endsAt,
      status: this.status,
    };
  }

  viewOrderDetail(orderId) {
    this.redirectTo(`${AppRoutes.ORDERS_DETAIL_PAGE}/${orderId}`);
  }
}
