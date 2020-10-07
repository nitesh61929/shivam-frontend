import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { IUser } from "@core/interfaces";
import { GetUserAction } from "@core/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-consumer-detail-container",
  templateUrl: "./consumer-detail-container.component.html",
})
export class ConsumerDetailContainerComponent extends BaseComponent
  implements OnInit {
  consumerDetail$: Observable<IUser>;
  loading$: Observable<boolean>;
  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    const consumerId = this.activatedRoute.snapshot.paramMap.get("id");
    if (consumerId) {
      this.store.dispatch(new GetUserAction(parseInt(consumerId, 10)));
    }
    this.consumerDetail$ = this.store.select((store) => store.core.user.user);
    this.loading$ = this.store.select((store) => store.core.user.loading);
  }

  onBackClick() {
    this.redirectTo(AppRoutes.CONSUMERS_PAGE);
  }

  onEditClick(consumerId: number) {
    this.redirectTo(`${AppRoutes.EDIT_CONSUMER_PAGE}/${consumerId}`);
  }
}
