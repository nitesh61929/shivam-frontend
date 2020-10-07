import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { IDeliveryLocation } from "@shared/interfaces";
import { Observable } from "rxjs";
import { IProduct } from "../../interfaces";

@Component({
  selector: "app-product-detail-container",
  templateUrl: "./product-detail-container.component.html",
})
export class ProductDetailContainerComponent extends BaseComponent
  implements OnInit {
  productDetail: IProduct;
  loading$: Observable<boolean>;
  deliveryLocationList: IDeliveryLocation[];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.deliveryLocationList = data.deliveryLocationList;
      this.productDetail = data.productDetail;
    });
  }

  onEditProduct(productId: number) {
    this.redirectTo(`${AppRoutes.EDIT_PRODUCT_PAGE}/${productId}`);
  }
}
