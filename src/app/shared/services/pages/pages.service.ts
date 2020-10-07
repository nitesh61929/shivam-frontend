import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { IPages } from "@shared/interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PagesService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  updatePages(payload: IPages) {
    return this.http.put(ApiUrls.PAGES, payload);
  }

  getPagesList(parameters: any) {
    return this.http.get(ApiUrls.PAGES, { params: parameters });
  }

  getPagesDetail(id: number): Observable<any> {
    return this.http.get(`${ApiUrls.PAGES}/${id}`);
  }
}
