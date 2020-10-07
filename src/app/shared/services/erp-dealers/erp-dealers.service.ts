import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErpDealersService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getErpDealers(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.ERP_DEALERS, { params: parameters });
  }

  getErpData(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.ERP_DATA, { params: parameters });
  }
}
