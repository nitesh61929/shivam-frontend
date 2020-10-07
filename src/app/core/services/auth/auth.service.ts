import { Injectable, Injector } from "@angular/core";
import { ApiUrls, Constants, StorageKeys } from "@core/enums";
import { ILoginPayload, IPasswordPayload, IProfile } from "@core/interfaces";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { BaseService } from "../base";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  viewProfile(): Observable<any> {
    return this.http.get(ApiUrls.PROFILE);
  }

  updateProfile(profile: IProfile): Observable<any> {
    return this.http.put(ApiUrls.PROFILE, profile);
  }

  updatePassword(passwordPayload: IPasswordPayload): Observable<any> {
    return this.http.patch(ApiUrls.UPDATE_PASSWORD, passwordPayload);
  }

  login(loginPayload: ILoginPayload) {
    return this.http
      .post(ApiUrls.LOGIN, loginPayload, {
        observe: "response" as "body",
      })
      .pipe(
        tap((response: any) => {
          this.setTokenToStorage(response);
          this.setPermissionToStorage(response.body.payload.permissions);
          return response;
        })
      );
  }

  logout() {
    return this.http.get(ApiUrls.LOGOUT).pipe(
      map((response: any) => {
        this.storage.clear();
        return response;
      })
    );
  }

  /**
   * Fetch token from headers and set it to the storage
   * @param response
   */
  setTokenToStorage(response: any): void {
    const token = response.headers.get(Constants.TOKEN_HEADER);
    this.storage.set(StorageKeys.TOKEN, token);
    this.storage.set(StorageKeys.USER, response.body.payload);
  }

  setPermissionToStorage(response: any): void {
    this.storage.set(StorageKeys.PERMISSIONS, response);
  }

  /**
   * Check whether logged in or not
   */
  isLoggedIn(): boolean {
    const token = this.storage.get(StorageKeys.TOKEN);
    return true ? token : false;
  }
}
