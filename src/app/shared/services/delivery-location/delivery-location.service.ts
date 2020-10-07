import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { IDeliveryLocation } from "@shared/interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeliveryLocationService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  updateDeliveryLocation(deliveryLocationPayload: IDeliveryLocation) {
    return this.http.put(ApiUrls.DELIVERY_LOCATIONS, deliveryLocationPayload);
  }

  getDeliveryLocationList(parameters: any) {
    return this.http.get(ApiUrls.DELIVERY_LOCATIONS, { params: parameters });
  }

  deleteDeliveryLocation(deliveryLocationId: number): Observable<any> {
    return this.http.delete(
      `${ApiUrls.DELIVERY_LOCATIONS}/${deliveryLocationId}`
    );
  }

  getDeliveryLocationDetail(deliveryLocationId: number): Observable<any> {
    return this.http.get(`${ApiUrls.DELIVERY_LOCATIONS}/${deliveryLocationId}`);
  }
}
