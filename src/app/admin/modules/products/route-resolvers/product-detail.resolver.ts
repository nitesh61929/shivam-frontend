import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { IProduct } from "../interfaces";
import { GetProductAction } from "../store";

@Injectable({
  providedIn: "root",
})
export class ProductDetailResolver implements Resolve<any> {
  productDetail$: Observable<IProduct>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    const productId = route.params.id;
    this.store.dispatch(new GetProductAction(parseInt(productId, 10)));

    this.productDetail$ = this.store.select((store) => store.products.product);
    return this.productDetail$.pipe(
      take(2),
      map((productDetail: IProduct) => productDetail)
    );
  }
}
