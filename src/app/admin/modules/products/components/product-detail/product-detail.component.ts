import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppPermissions, AppRoutes, EModuleAllocation } from "@core/enums";
import { IDetailOptions } from "@shared/detail/interfaces/detail-options";
import { IFormOptions } from "@shared/form/interfaces/form-options";
import { IDeliveryLocation } from "@shared/interfaces";
import { PriceFormContainerComponent } from "@shared/price/containers/price-form";
import { PriceListContainerComponent } from "@shared/price/containers/price-list";
import { Observable } from "rxjs";
import { IProduct } from "../../interfaces";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
  @ViewChild("PriceListContainerCmp")
  PriceListContainerCmp: PriceListContainerComponent;
  @ViewChild("priceFormContainerCmp")
  priceFormContainerCmp: PriceFormContainerComponent;
  @Output()
  editProduct: EventEmitter<number> = new EventEmitter<number>();
  @Input() productDetail: IProduct;
  @Input() loading$: Observable<boolean>;
  @Input() deliveryLocationList: IDeliveryLocation[];
  formOptions: IFormOptions;
  moduleAllocationEnum = EModuleAllocation;
  detailOptions: IDetailOptions;
  hasEditAccess = AppPermissions.EDIT_PRODUCT;
  hasPriceListAccess = AppPermissions.LIST_PRICE;
  hasPriceAddAccess = AppPermissions.ADD_PRICE;
  hasPriceEditAccess = AppPermissions.EDIT_PRICE;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.detailOptions = {
      headerTitle: "product_detail_label",
      formClass: "product-detail",
    };
  }

  onBackClick() {
    this.redirectTo(AppRoutes.PRODUCTS_PAGE);
  }

  onEditClick() {
    this.editProduct.emit(this.productDetail.id);
  }

  onUpdateFormSuccess() {
    this.PriceListContainerCmp.onUpdateFormSuccess();
  }

  onAddFormSuccess() {
    this.PriceListContainerCmp.onAddFormSuccess();
  }

  onEditPrice(event: any) {
    this.priceFormContainerCmp.onEditPrice(event);
  }
}
