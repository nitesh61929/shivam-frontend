import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";

@Injectable({
  providedIn: "root",
})
export class ProvincesWithDistrictsService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getProvincesWithDistricts() {
    return this.http.get(ApiUrls.PROVINCES_DISTRICTS);
  }
}
