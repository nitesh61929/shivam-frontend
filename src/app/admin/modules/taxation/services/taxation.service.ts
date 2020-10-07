import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { Observable } from "rxjs";
import { ITaxation } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class TaxationService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getCharges(): Observable<any> {
    return this.http.get(ApiUrls.CHARGES);
  }

  getChargeDetail(id: number): Observable<any> {
    return this.http.get(`${ApiUrls.CHARGES}/${id}`);
  }

  updateCharge(chargePayload: ITaxation): Observable<any> {
    return this.http.patch(
      `${ApiUrls.CHARGES}/${chargePayload.id}`,
      chargePayload
    );
  }
}
