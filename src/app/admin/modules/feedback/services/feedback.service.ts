import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FeedbackService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getFeedbacks(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.FEEDBACKS, { params: parameters });
  }
}
