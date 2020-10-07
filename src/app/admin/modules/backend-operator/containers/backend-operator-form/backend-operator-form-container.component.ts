import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { IPermissions } from "@core/interfaces/permission";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { BackendOperatorFormComponent } from "../../components";
import { IBackendOperator } from "../../interfaces";
import {
  AddBackendOperatorAction,
  UpdateBackendOperatorAction,
} from "../../store";

@Component({
  selector: "app-backend-operator-form-container",
  templateUrl: "./backend-operator-form-container.component.html",
})
export class BackendOperatorFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("backendOperatorFormCmp")
  backendOperatorFormCmp: BackendOperatorFormComponent;
  permissions: IPermissions;
  error$: Observable<any>;
  backendOperatorDetail: IBackendOperator;
  backendOperatorId: number;
  loading$: Observable<any>;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.trackRoute();
    this.listenObservables();
    this.backendOperatorId = +this.activatedRoute.snapshot.paramMap.get("id");
  }

  listenObservables() {
    this.error$ = this.store.select((store) => store.backendOperator.error);
    this.loading$ = this.store.select((store) => store.backendOperator.loading);
    this.error$.subscribe((err) => {
      if (err && this.backendOperatorFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.backendOperatorFormCmp.backEndOperatorForm,
          err
        );
      }
    });
  }

  trackRoute() {
    this.activatedRoute.data.subscribe((list) => {
      this.permissions = list.permissions;
    });

    this.activatedRoute.data.subscribe((data) => {
      this.backendOperatorDetail = data.backendOperatorDetail;
    });
  }

  onSaveOrUpdateBackendOperator(backendOperatorForm: FormGroup) {
    if (backendOperatorForm.valid) {
      if (this.backendOperatorId) {
        this.store.dispatch(
          new UpdateBackendOperatorAction(
            this.backendOperatorId,
            backendOperatorForm.value
          )
        );
      } else {
        this.store.dispatch(
          new AddBackendOperatorAction(backendOperatorForm.value)
        );
      }
    }
  }

  onCancelBackendOperator() {
    this.redirectTo(AppRoutes.BACKEND_OPERATOR_PAGE);
  }
}
