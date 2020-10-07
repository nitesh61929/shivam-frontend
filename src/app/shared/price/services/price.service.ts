import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { Observable } from "rxjs";
import { IPrice } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class PriceService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getPrices(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.PRICES, { params: parameters });
  }

  getPriceDetail(id: number): Observable<any> {
    return this.http.get(`${ApiUrls.PRICES}/${id}`);
  }

  addPrice(pricePayload: IPrice): Observable<any> {
    return this.http.post(`${ApiUrls.PRICES}`, pricePayload);
  }

  updatePrice(priceId: number, pricePayload: IPrice): Observable<any> {
    return this.http.put(`${ApiUrls.PRICES}/${priceId}`, pricePayload);
  }

  deletePrice(priceId: number): Observable<any> {
    return this.http.delete(`${ApiUrls.PRICES}/${priceId}`);
  }
}
