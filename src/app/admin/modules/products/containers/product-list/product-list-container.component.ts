import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes, StorageKeys } from "@core/enums";
import { IPagination } from "@core/interfaces";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IProduct } from "../../interfaces";
import { DeleteProductAction, LoadProductsAction } from "../../store";

@Component({
  selector: "app-product-list-container",
  templateUrl: "./product-list-container.component.html",
})
export class ProductListContainerComponent extends BaseComponent
  implements OnInit {
  products$: Observable<Array<IProduct>>;
  loadingProduct$: Observable<boolean>;
  error$: Observable<Error>;
  pagination$: Observable<IPagination>;
  products: IProduct[] = [];

  page: number;
  perPage: number;
  parameters: any;

  constructor(private store: Store<any>, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    const param = {
      paginate: 1,
      page: 0,
      per_page: this.storage.get(StorageKeys.PER_PAGE),
      search: "",
    };
    this.loadProducts(param);

    this.products$ = this.store.select((store) => store.products.list);
    this.loadingProduct$ = this.store.select((store) => store.products.loading);
    this.error$ = this.store.select((store) => store.products.error);
    this.pagination$ = this.store.select((store) => store.products.pagination);
  }

  loadProducts(param) {
    this.parameters = param;
    this.store.dispatch(new LoadProductsAction(param));
  }

  onDeleteProduct(productId: number) {
    const options = {
      title: this.translateService.instant("delete_label"),
      message: this.translateService.instant("product_delete_message"),
      cancelText: this.translateService.instant("cancel_label"),
      confirmText: this.translateService.instant("confirm_label"),
    };
    this.confirmDialog.open(options);

    this.confirmDialog.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.store.dispatch(new DeleteProductAction(productId));
      }
    });
  }

  onEditProduct(productId: number) {
    this.redirectTo(`${AppRoutes.EDIT_PRODUCT_PAGE}/${productId}`);
  }

  onProductDetail(productId: number) {
    this.redirectTo(`${AppRoutes.DETAIL_PRODUCT_PAGE}/${productId}`);
  }

  onParamChanged(param) {
    this.loadProducts(param);
  }
}
