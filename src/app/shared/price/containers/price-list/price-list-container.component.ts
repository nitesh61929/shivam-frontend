import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { BaseComponent } from "@core/components";
import { ApiUrls, StorageKeys } from "@core/enums";
import { IPagination, IParameter } from "@core/interfaces";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { IDownloadOptions } from "@shared/download";
import { IPrice } from "@shared/price";
import {
  DeletePriceAction,
  LoadPriceAction,
  PriceActionTypes,
} from "@shared/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "app-price-list-container",
  templateUrl: "./price-list-container.component.html",
})
export class PriceListContainerComponent extends BaseComponent
  implements OnInit {
  @Output() editPrice: EventEmitter<number> = new EventEmitter<number>();
  @Input() productId: number;
  prices$: Observable<IPrice[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  pagination$: Observable<IPagination>;
  downloadOptions: IDownloadOptions;

  page = 0;
  perPage = 5;
  search = "";

  constructor(
    private store: Store<any>,
    injector: Injector,
    deletePriceSuccess$: Actions
  ) {
    super(injector);
    deletePriceSuccess$
      .pipe(ofType(PriceActionTypes.DELETE_PRICE_SUCCESS), take(1))
      .subscribe((prices: any) => {
        this.loadPrice(this.getParam());
      });
  }

  ngOnInit(): void {
    this.prices$ = this.store.select((store) => store.shared.price.list);

    this.loading$ = this.store.select((store) => store.shared.price.loading);
    this.error$ = this.store.select((store) => store.shared.price.error);
    this.pagination$ = this.store.select(
      (store) => store.shared.price.pagination
    );

    this.loadPrice(this.getParam());
    this.setDownloadOptions();
  }

  setDownloadOptions() {
    this.downloadOptions = {
      resourceUrl: ApiUrls.PRICES_EXPORT_TO_EXCEL,
      fileName: this.translateService.instant("prices"),
    };
  }

  getParam(parameter?: IParameter) {
    return {
      namespace: "product",
      namespace_id: this.productId,
      paginate: 1,
      search: this.search,
      page: this.page,
      per_page: this.storage.get(StorageKeys.PER_PAGE),
    };
  }

  onEditPrice(priceId: number) {
    this.editPrice.emit(priceId);
  }

  onDeletePrice(priceId: number) {
    this.confirmDialog.open(this.getDeleteOptionsForDialog());

    this.confirmDialog.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.store.dispatch(new DeletePriceAction(priceId));
      }
    });
  }

  onUpdateFormSuccess() {
    this.loadPrice(this.getParam());
  }

  onAddFormSuccess() {
    this.loadPrice(this.getParam());
  }

  loadPrice(param: IParameter) {
    this.store.dispatch(new LoadPriceAction(param));
  }

  onParamChanged(param: IParameter) {
    this.page = param.page || param.page === 0 ? param.page : this.page;
    this.search =
      param.search || param.search === "" ? param.search : this.search;
    this.perPage = this.storage.get(StorageKeys.PER_PAGE);

    this.loadPrice(this.getParam(param));
  }
}
