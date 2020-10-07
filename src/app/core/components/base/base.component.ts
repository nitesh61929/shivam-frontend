import { Component, Injector } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageKeys } from "@core/enums";
import { IUser } from "@core/interfaces";
import { DatasService, SnackBarService, StorageService } from "@core/services";
import { environment } from "@environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogService } from "@shared/confirm-dialog";
import { ErrorMessageService } from "@shared/error-message/services/error-message.service";

@Component({
  template: "",
})
export class BaseComponent {
  protected router: Router;
  protected formBuilder: FormBuilder;
  protected snackBar: SnackBarService;
  protected storage: StorageService;
  protected confirmDialog: ConfirmDialogService;
  protected activatedRoute: ActivatedRoute;
  protected errorMessageService: ErrorMessageService;
  protected translateService: TranslateService;
  protected globalDatas: DatasService;
  public perPage;

  constructor(protected injector: Injector) {
    this.router = injector.get(Router);
    this.formBuilder = injector.get(FormBuilder);
    this.snackBar = injector.get(SnackBarService);
    this.storage = injector.get(StorageService);
    this.confirmDialog = injector.get(ConfirmDialogService);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.errorMessageService = injector.get(ErrorMessageService);
    this.translateService = injector.get(TranslateService);
    this.globalDatas = injector.get(DatasService);

    if (!this.storage.get(StorageKeys.PER_PAGE)) {
      this.storage.set(StorageKeys.PER_PAGE, 5);
    }
    this.perPage = this.storage.get(StorageKeys.PER_PAGE);
  }

  /**
   *
   * @param route accepts route to navigate e.g: module/path (auth/login)
   */
  redirectTo(route: string, state?: any): void {
    this.router.navigateByUrl(route, state);
  }

  redirectToDefaultPage() {
    this.router.navigateByUrl(this.storage.get(StorageKeys.DEFAULT_ROUTE));
  }

  /**
   *
   * @param prop
   */
  getUserProfileFromStorage(prop: string): string | IUser {
    const userFromStorage = this.storage.get(StorageKeys.USER);
    return prop ? userFromStorage[prop] : userFromStorage;
  }

  getDeleteOptionsForDialog() {
    const options = {
      title: this.translateService.instant("delete_label"),
      message: this.translateService.instant("delete_message"),
      cancelText: this.translateService.instant("cancel_label"),
      confirmText: this.translateService.instant("confirm_label"),
    };

    return options;
  }

  getFormattedDate(date: string): Date {
    if (date) {
      return new Date(date.replace(/-/g, "/"));
    }
  }

  getDefaultPageSizeOptions(): Array<number> {
    return environment.pageSizeOptions;
  }
}
