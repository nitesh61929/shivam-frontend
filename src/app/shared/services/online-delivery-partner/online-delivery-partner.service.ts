import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { Observable } from "rxjs";
import { IOnlineDeliveryPartner } from "../../interfaces/online-delivery-partner";

@Injectable({
  providedIn: "root",
})
export class OnlineDeliveryPartnerService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  createOnlineDeliveryPartner(
    onlineDeliverypartner: IOnlineDeliveryPartner
  ): Observable<any> {
    return this.http.post(
      `${ApiUrls.ONLINE_DELIVERY_PARTNER}`,
      onlineDeliverypartner
    );
  }

  updateOnlineDeliveryPartner(
    onlineDeliveryPartnerId: number,
    onlineDeliverypartner: IOnlineDeliveryPartner
  ): Observable<any> {
    return this.http.put(
      `${ApiUrls.ONLINE_DELIVERY_PARTNER}/${onlineDeliveryPartnerId}`,
      onlineDeliverypartner
    );
  }

  getOnlineDeliveryPartnerDetail(
    onlineDeliveryPartnerId: number
  ): Observable<any> {
    return this.http.get(
      `${ApiUrls.ONLINE_DELIVERY_PARTNER}/${onlineDeliveryPartnerId}`
    );
  }

  getOnlineDeliveryPartners(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.ONLINE_DELIVERY_PARTNER, {
      params: parameters,
    });
  }
}
