import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "@core/enums";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { IProduct } from "../../interfaces";
import { ProductsService } from "../../services";
import {
  AddProductAction,
  AddProductFailureAction,
  AddProductSuccessAction,
  DeleteProductAction,
  DeleteProductFailureAction,
  DeleteProductSuccessAction,
  GetProductAction,
  GetProductFailureAction,
  GetProductSuccessAction,
  LoadProductsAction,
  LoadProductsFailureAction,
  LoadProductsSuccessAction,
  ProductActionTypes,
} from "../actions";

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() loadProducts$ = this.actions$.pipe(
    ofType<LoadProductsAction>(ProductActionTypes.LOAD_PRODUCTS),
    mergeMap((d) =>
      this.productsService.getProducts(d.param).pipe(
        map((data) => {
          return new LoadProductsSuccessAction(data);
        }),
        catchError((error) => of(new LoadProductsFailureAction(error)))
      )
    )
  );

  @Effect() addProduct$ = this.actions$.pipe(
    ofType<AddProductAction>(ProductActionTypes.ADD_PRODUCT),
    mergeMap((data) =>
      this.productsService.updateProduct(data.payload).pipe(
        map(() => new AddProductSuccessAction(data.payload)),
        catchError((error) => of(new AddProductFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  addProductSuccess$ = this.actions$.pipe(
    ofType(ProductActionTypes.ADD_PRODUCT_SUCCESS),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect() deleteProduct$ = this.actions$.pipe(
    ofType<DeleteProductAction>(ProductActionTypes.DELETE_PRODUCT),
    mergeMap((data) =>
      this.productsService.deleteProduct(data.productId).pipe(
        map(() => new DeleteProductSuccessAction(data.productId)),
        catchError((error) => of(new DeleteProductFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteProductSuccess$ = this.actions$.pipe(
    ofType(ProductActionTypes.DELETE_PRODUCT_SUCCESS),
    tap((response) => {
      this.snackbar.open(
        this.translate.instant("item_deleted_message"),
        "success"
      );
    })
  );

  @Effect() getProduct$ = this.actions$.pipe(
    ofType<GetProductAction>(ProductActionTypes.GET_PRODUCT),
    mergeMap((data) =>
      this.productsService.getProductDetail(data.productId).pipe(
        map((product) => {
          return new GetProductSuccessAction(product);
        }),
        catchError((error) => of(new GetProductFailureAction(error)))
      )
    )
  );

  onSuccess(productResponse: IProduct) {
    const infoMessage = productResponse.id
      ? this.translate.instant("item_updated_message")
      : this.translate.instant("item_added_message");
    this.router.navigateByUrl(AppRoutes.PRODUCTS_PAGE);
    this.snackbar.open(infoMessage, "success");
  }
}
