import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";

@Injectable({
  providedIn: "root",
})
export class DashboardService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getConsumersSMS() {
    return this.http.get(ApiUrls.CONSUMERS_SMS);
  }

  getOrdersAmount(parameters: any) {
    return this.http.get(ApiUrls.DASHBOARD_ORDERS_AMOUNT, {
      params: parameters,
    });
  }

  getOrdersByPaymentMethods(parameters: any) {
    return this.http.get(ApiUrls.DASHBOARD_PAYMENT_METHODS_ORDERS, {
      params: parameters,
    });
  }
}
