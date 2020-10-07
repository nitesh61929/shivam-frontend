import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { PermissionsService } from "@core/services/permissions";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PermissionGuard implements CanActivate {
  constructor(
    private permissionsService: PermissionsService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let bool = true;
    if (next.data.hasAccess) {
      const isAccessBool = this.permissionsService.checkAuthorization(
        next.data.hasAccess
      );
      isAccessBool.subscribe((isAccess: boolean) => {
        if (!isAccess) {
          bool = false;
          this.router.navigateByUrl("access-denied");
        }
      });
    } else {
      return throwError(
        "hasAccess property missing in route data. Please pass data in route with permission guard."
      );
    }
    return bool;
  }
}
