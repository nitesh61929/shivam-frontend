import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeliveryLocationService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getDeliveryLocations(): Observable<any> {
    return this.http.get(ApiUrls.DELIVERY_LOCATIONS);
  }

  getDeliveryLocationDetail(deliveryLocationId: number): Observable<any> {
    return this.http.get(`${ApiUrls.DELIVERY_LOCATIONS}/${deliveryLocationId}`);
  }
}
