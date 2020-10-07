import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { StorageKeys } from "@core/enums";
import { AuthService, StorageService } from "@core/services";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NegateAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: StorageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl(this.storage.get(StorageKeys.DEFAULT_ROUTE));
    // this.router.navigateByUrl(AppRoutes.DASHBOARD_PAGE);
  }
}
