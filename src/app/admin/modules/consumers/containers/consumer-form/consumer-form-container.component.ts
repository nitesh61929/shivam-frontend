import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { IUser } from "@core/interfaces";
import { EditUserAction, GetUserAction } from "@core/store";
import { Store } from "@ngrx/store";
import { IProvinceDistricts } from "@shared/interfaces";
import { Observable } from "rxjs";
import { ConsumerFormComponent } from "../../components";

@Component({
  selector: "app-consumer-form-container",
  templateUrl: "./consumer-form-container.component.html",
})
export class ConsumerFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("consumerFormCmp")
  consumerFormCmp: ConsumerFormComponent;
  error$: Observable<any>;
  consumerDetail$: Observable<IUser>;
  provincesWithDistricts: IProvinceDistricts;
  loading$: Observable<any>;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }
  ngOnInit(): void {
    this.fetchConsumer();
    this.listenObservables();
    this.trackRoute();
  }

  trackRoute() {
    this.activatedRoute.data.subscribe((data) => {
      this.provincesWithDistricts = data.provincesWithDistricts;
    });
  }

  listenObservables() {
    this.consumerDetail$ = this.store.select((store) => store.core.user.user);
    this.error$ = this.store.select((store) => store.core.user.error);
    this.loading$ = this.store.select((store) => store.core.user.loading);
    this.error$.subscribe((err) => {
      if (err && this.consumerFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.consumerFormCmp.consumerForm,
          err
        );
      }
    });
  }

  fetchConsumer() {
    const consumerId = this.activatedRoute.snapshot.paramMap.get("id");
    if (consumerId) {
      this.store.dispatch(new GetUserAction(parseInt(consumerId, 10)));
    }
  }

  onUpdateConsumer(consumerForm: FormGroup) {
    if (consumerForm.valid) {
      const consumeId = consumerForm.get("id").value;
      if (consumeId) {
        this.store.dispatch(
          new EditUserAction(parseInt(consumeId, 10), consumerForm.value)
        );
      }
    }
  }

  onCancelConsumer() {
    this.redirectTo(AppRoutes.CONSUMERS_PAGE);
  }
}
