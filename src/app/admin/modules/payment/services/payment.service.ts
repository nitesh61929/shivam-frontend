import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PaymentService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getPaymentMethods(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.PAYMENTS, { params: parameters });
  }

  updatePaymentMethod(id: number, statusObj: any): Observable<any> {
    return this.http.patch(`${ApiUrls.PAYMENTS}/${id}`, statusObj);
  }
}
