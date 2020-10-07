import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { Observable } from "rxjs";
import { IOrderCancelReason } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class OrderService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getOrders(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.ORDERS, { params: parameters });
  }

  getOrderGrandTotal(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.ORDER_GRAND_TOTAL, { params: parameters });
  }

  getOrderDetail(orderId: number): Observable<any> {
    return this.http.get(`${ApiUrls.ORDERS}/${orderId}`);
  }

  allocateOrder(orderId: number, assignDealerPayload: any): Observable<any> {
    return this.http.post(
      `${ApiUrls.ORDERS}/${orderId}/allocations`,
      assignDealerPayload
    );
  }

  revokeOrder(orderId: number, allocationId: number): Observable<any> {
    return this.http.delete(`${ApiUrls.ORDERS}/${orderId}/allocations`);
  }

  cancelOrder(
    orderId: number,
    cancelReason: IOrderCancelReason
  ): Observable<any> {
    return this.http.post(
      `${ApiUrls.ORDERS}/${orderId}/order-cancel`,
      cancelReason
    );
  }
}
