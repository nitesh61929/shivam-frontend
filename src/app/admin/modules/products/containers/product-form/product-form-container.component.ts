import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { IData } from "@core/interfaces";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { ProductFormComponent } from "../../components";
import { IProduct } from "../../interfaces";
import { AddProductAction, GetProductAction } from "../../store";

@Component({
  selector: "app-product-form-container",
  templateUrl: "./product-form-container.component.html",
})
export class ProductFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("productFormCmp") productFormCmp: ProductFormComponent;
  error$: Observable<any>;
  productDetail$: Observable<IProduct>;
  moduleAllocations: IData[];
  loading$: Observable<any>;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchProductId();
    this.productDetail$ = this.store.select((store) => store.products.product);
    this.error$ = this.store.select((store) => store.products.error);
    this.loading$ = this.store.select((store) => store.products.loading);
    this.error$.subscribe((err) => {
      if (err && this.productFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.productFormCmp.productForm,
          err
        );
      }
    });
    this.globalDatas
      .getModuleAllocations()
      .pipe(take(1))
      .subscribe((moduleAllcoations: IData[]) => {
        this.moduleAllocations = moduleAllcoations;
      });
  }

  fetchProductId() {
    const productId = this.activatedRoute.snapshot.paramMap.get("id");
    if (productId) {
      this.store.dispatch(new GetProductAction(parseInt(productId, 10)));
    }
  }

  onSaveOrUpdateProduct(productForm: FormGroup) {
    if (productForm.valid) {
      this.store.dispatch(new AddProductAction(productForm.value));
    }
  }

  onCancelProduct() {
    this.redirectTo(AppRoutes.PRODUCTS_PAGE);
  }
}
