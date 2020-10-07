import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TaxationFormComponent } from "../../components";
import { ITaxation } from "../../interfaces";
import { GetTaxationAction, UpdateTaxationAction } from "../../store";

@Component({
  selector: "app-taxation-form-container",
  templateUrl: "./taxation-form-container.component.html",
})
export class TaxationFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("taxationFormCmp") taxationFormCmp: TaxationFormComponent;
  loading$: Observable<any>;
  taxationDetail$: Observable<ITaxation>;
  error$: Observable<Error>;
  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.taxationDetail$ = this.store.select((store) => store.taxation.detail);
    this.error$ = this.store.select((store) => store.taxation.error);
    this.loading$ = this.store.select((store) => store.taxation.loading);
    this.error$.subscribe((err) => {
      if (err && this.taxationFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.taxationFormCmp.taxationForm,
          err
        );
      }
    });

    const taxationId = this.activatedRoute.snapshot.paramMap.get("id");
    if (taxationId) {
      this.store.dispatch(new GetTaxationAction(parseInt(taxationId, 10)));
    }
  }

  onUpdateTaxation(taxationForm: FormGroup) {
    if (taxationForm.valid) {
      this.store.dispatch(new UpdateTaxationAction(taxationForm.value));
    }
  }

  onCancelTaxation() {
    this.redirectTo(AppRoutes.TAXATION_PAGE);
  }
}
