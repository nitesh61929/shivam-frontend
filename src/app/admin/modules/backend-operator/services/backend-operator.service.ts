import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import { Observable } from "rxjs";
import { IBackendOperator } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class BackendOperatorService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  createBackEndOperator(backendOperator: IBackendOperator): Observable<any> {
    return this.http.post(`${ApiUrls.BACKEND_OPERATOR}`, backendOperator);
  }

  getBackendOperators(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.BACKEND_OPERATOR, { params: parameters });
  }

  getBackendOperatorDetail(backendOperatorId: number): Observable<any> {
    return this.http.get(`${ApiUrls.BACKEND_OPERATOR}/${backendOperatorId}`);
  }

  updateBackEndOperator(
    backendOperatorId: number,
    backendOperator: IBackendOperator
  ): Observable<any> {
    return this.http.put(
      `${ApiUrls.BACKEND_OPERATOR}/${backendOperatorId}`,
      backendOperator
    );
  }
}
