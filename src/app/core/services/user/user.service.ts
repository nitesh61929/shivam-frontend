import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { IUser } from "@core/interfaces";
import { Observable } from "rxjs";
import { BaseService } from "../base";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getUsers(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.USERS, { params: parameters });
  }

  activateDeactivateUser(userId: number, parameters: any) {
    return this.http.patch(`${ApiUrls.USERS}/${userId}/activate`, null, {
      params: parameters,
    });
  }

  getUserDetail(userId: number): Observable<any> {
    return this.http.get(`${ApiUrls.USERS}/${userId}`);
  }

  getDealerAllocations(dealerId: number): Observable<any> {
    return this.http.get(
      `${ApiUrls.DEALER_ALLOCATIONS}/${dealerId}/allocations`
    );
  }

  updateUser(userId: number, user: IUser): Observable<any> {
    return this.http.put(`${ApiUrls.USERS}/${userId}`, user);
  }
}
