import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AppPermissions } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
})
export class ProductsComponent implements OnInit {
  @Output() addProduct: EventEmitter<any> = new EventEmitter<any>();

  pageHeaderOptions: IPageHeaderOptions;
  hasListAccess = AppPermissions.LIST_PRODUCT;

  constructor() {}

  ngOnInit(): void {
    this.pageHeaderOptions = {
      title: "products",
      showAddBtn: true,
      hasAddAccess: AppPermissions.ADD_PRODUCT,
    };
  }

  onAddProduct() {
    this.addProduct.emit();
  }
}
