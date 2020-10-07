import { Injectable, Injector } from "@angular/core";
import { ApiUrls, StorageKeys } from "@core/enums";
import { IPermissions } from "@core/interfaces/permission";
import { Observable, of } from "rxjs";
import { AuthService } from "../auth";
import { BaseService } from "../base";
import { StorageService } from "../storage";

@Injectable({
  providedIn: "root",
})
export class PermissionsService extends BaseService {
  permissions: IPermissions;

  constructor(
    injector: Injector,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    super(injector);

    // this.storageService.watchStorage().subscribe((d) => {
    //   this.permissions = this.storage.get(StorageKeys.PERMISSIONS);
    // });
  }

  checkAuthorization(canAccess: any): Observable<boolean> {
    this.permissions = this.storage.get(StorageKeys.PERMISSIONS);

    // if (!this.permissions) {
    //   return this.authService.getUserPermission().pipe(
    //     tap((permissions) => {
    //       this.permissions = permissions;
    //       this.authService.setPermissionToStorage(this.permissions);
    //     }),
    //     map((permissions) => this.doCheckAuthorization(canAccess))
    //   );
    // }
    return of(this.doCheckAuthorization(canAccess));
  }

  private doCheckAuthorization(canAccess: string): boolean {
    if (canAccess) {
      if (canAccess === "*") {
        return true;
      } else {
        const moduleMethodAccess = canAccess.split(".");
        const moduleName = moduleMethodAccess[0];
        const methodName = moduleMethodAccess[1];

        if (moduleName && !methodName) {
          return this.checkForModuleNameOnly(moduleName);
        } else if (moduleName && methodName) {
          return this.checkForModuleAndMethodName(moduleName, methodName);
        }
      }
    }
  }

  private checkForModuleNameOnly(moduleName: string): boolean {
    let bool = false;
    if (this.permissions) {
      Object.entries(this.permissions).forEach(([key, values]) => {
        if (key.toLowerCase() === moduleName.toLowerCase()) {
          bool = true;
        }
      });
    }
    return bool;
  }

  private checkForModuleAndMethodName(
    moduleName: string,
    methodName: string
  ): boolean {
    let bool = false;
    if (this.permissions) {
      Object.entries(this.permissions).forEach(([key, values]) => {
        if (key.toLowerCase() === moduleName.toLowerCase()) {
          values.forEach((value) => {
            if (value === methodName) {
              bool = true;
            }
          });
        }
      });
    }
    return bool;
  }

  getPermissions(): Observable<any> {
    return this.http.get(ApiUrls.PERMISSIONS);
  }
}
