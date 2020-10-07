import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { IConfiguration } from "@shared/interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfigurationService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  updateConfiguration(payload: IConfiguration) {
    return this.http.put(ApiUrls.CONFIGURATIONS, payload);
  }

  getConfigurationList(parameters: any) {
    return this.http.get(ApiUrls.CONFIGURATIONS, { params: parameters });
  }

  getConfigurationDetail(id: number): Observable<any> {
    return this.http.get(`${ApiUrls.CONFIGURATIONS}/${id}`);
  }
}
