import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ITaxation } from "../../interfaces";
import { LoadTaxationAction } from "../../store";

@Component({
  selector: "app-taxation-list-container",
  templateUrl: "./taxation-list-container.component.html",
})
export class TaxationListContainerComponent extends BaseComponent
  implements OnInit {
  taxationList$: Observable<ITaxation[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  constructor(private store: Store<any>, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.taxationList$ = this.store.select((store) => store.taxation.list);
    this.loading$ = this.store.select((store) => store.taxation.loading);
    this.error$ = this.store.select((store) => store.taxation.error);

    this.store.dispatch(new LoadTaxationAction());
  }

  onEditTaxation(taxationId: number) {
    this.redirectTo(`${AppRoutes.EDIT_TAXATION_PAGE}/${taxationId}`);
  }
}
