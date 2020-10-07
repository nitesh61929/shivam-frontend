import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { ApiUrls, AppRoutes, StorageKeys } from "@core/enums";
import { IPagination, IParameter } from "@core/interfaces";
import { ToggleUserAction } from "@core/store";
import { Store } from "@ngrx/store";
import { IDownloadOptions } from "@shared/download";
import { Observable } from "rxjs";
import { IBackendOperator, IToggleBackendOperatorObj } from "../../interfaces";
import { LoadBackendOperatorAction } from "../../store";

@Component({
  selector: "app-backend-operator-list-container",
  templateUrl: "./backend-operator-list-container.component.html",
})
export class BackendOperatorListContainerComponent extends BaseComponent
  implements OnInit {
  backendOperatorList$: Observable<IBackendOperator[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  pagination$: Observable<IPagination>;
  downloadOptions: IDownloadOptions;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.setDownloadOptions();

    this.backendOperatorList$ = this.store.select(
      (store) => store.backendOperator.list
    );

    this.loading$ = this.store.select((store) => store.backendOperator.loading);
    this.error$ = this.store.select((store) => store.backendOperator.error);
    this.pagination$ = this.store.select(
      (store) => store.backendOperator.pagination
    );

    this.loadBackendOperator(this.getParam());
  }

  loadBackendOperator(param: IParameter) {
    this.store.dispatch(new LoadBackendOperatorAction(param));
  }

  setDownloadOptions() {
    this.downloadOptions = {
      resourceUrl: ApiUrls.BACKEND_OPERATORS_EXPORT_TO_EXCEL,
      fileName: this.translateService.instant("backend_operator"),
    };
  }

  getParam(parameter?: IParameter) {
    return {
      paginate: 1,
      page: parameter && parameter.page ? parameter.page : 0,
      per_page: this.storage.get(StorageKeys.PER_PAGE),
      search: parameter && parameter.search ? parameter.search : "",
      status: -1,
    };
  }

  onParamChange(param: IParameter) {
    this.loadBackendOperator(this.getParam(param));
    // this.downloadOptions.parameter = this.getParam(param);
  }

  onBackendOperatorToggle(toggleBackendOperatorObj: IToggleBackendOperatorObj) {
    const param = {
      status: toggleBackendOperatorObj.value ? 1 : 0,
    };
    this.store.dispatch(
      new ToggleUserAction(toggleBackendOperatorObj.backendOperatorId, param)
    );
  }

  onBackendOperatorDetail(backendOperatorId: number) {
    this.redirectTo(
      `${AppRoutes.DETAIL_BACKEND_OPERATOR_PAGE}/${backendOperatorId}`
    );
  }

  onBackendOperatorEdit(backendOperatorId: number) {
    this.redirectTo(
      `${AppRoutes.EDIT_BACKEND_OPERATOR_PAGE}/${backendOperatorId}`
    );
  }
}
