import { Injectable, Injector } from "@angular/core";
import { BaseService } from "@core/services";
import * as httpUtilites from "@core/utilities/http-utilities";

@Injectable({
  providedIn: "root",
})
export class DownloadService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  download(resourceUrl, parameters: any) {
    parameters.paginate = 0;
    const params = httpUtilites.setParameters(parameters);
    return this.http.get(resourceUrl, {
      params: parameters,
      responseType: "blob",
    });
  }
}
