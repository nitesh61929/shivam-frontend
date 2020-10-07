import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components/base";
import { AppRoutes } from "@core/enums";

@Component({
  selector: "app-products-container",
  templateUrl: "./products-container.component.html",
})
export class ProductsContainerComponent extends BaseComponent
  implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  onAddProduct() {
    this.redirectTo(AppRoutes.CREATE_PRODUCT_PAGE);
  }
}
