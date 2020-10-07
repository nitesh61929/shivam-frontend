import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import CommonUtilities from "@core/utilities/common-utilities";
import { Observable } from "rxjs";
import { IProduct } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class ProductsService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getProducts(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.PRODUCTS, { params: parameters });
  }

  updateProduct(productPayload: IProduct): Observable<any> {
    return this.http.post(
      ApiUrls.PRODUCTS,
      CommonUtilities.toFormData(productPayload)
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${ApiUrls.PRODUCTS}/${productId}`);
  }

  getProductDetail(productId: number): Observable<any> {
    return this.http.get(`${ApiUrls.PRODUCTS}/${productId}`);
  }
}
