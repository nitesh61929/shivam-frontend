import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IProduct } from "@app/admin/modules/products";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import CommonUtilities from "@core/utilities/common-utilities";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { IDeliveryLocation } from "@shared/interfaces";
import { PriceFormComponent } from "@shared/price/components/price-form/price-form.component";
import { IPrice } from "@shared/price/interfaces";
import { GetPriceAction, PriceActionTypes } from "@shared/store";
import {
  AddPriceAction,
  UpdatePriceAction,
} from "@shared/store/actions/price.actions";
import { Observable } from "rxjs";

@Component({
  selector: "app-price-form-container",
  templateUrl: "./price-form-container.component.html",
})
export class PriceFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("priceFormCmp") priceFormCmp: PriceFormComponent;
  @Output() updateFormSuccess: EventEmitter<null> = new EventEmitter<null>();
  @Output() addFormSuccess: EventEmitter<null> = new EventEmitter<null>();
  @Input() deliveryLocationList: IDeliveryLocation[];
  @Input() productId: number;
  @Input() productDetail: IProduct;
  error$: Observable<Error>;
  priceDetail$: Observable<IPrice>;
  formEditState = false;

  constructor(
    private store: Store<any>,
    injector: Injector,
    updatePriceSuccess$: Actions,
    addPriceSuccess$: Actions
  ) {
    super(injector);
    updatePriceSuccess$
      .pipe(ofType(PriceActionTypes.UPDATE_PRICE_SUCCESS))
      .subscribe(() => {
        this.formEditState = false;
        this.priceFormCmp.priceDetail = null;
        this.priceFormCmp.resetForm();
        this.updateFormSuccess.emit();
        this.priceFormCmp.priceForm.get("delivery_location_id").enable();
      });

    addPriceSuccess$
      .pipe(ofType(PriceActionTypes.ADD_PRICE_SUCCESS))
      .subscribe(() => {
        this.priceFormCmp.priceDetail = null;
        this.priceFormCmp.resetForm();
        this.addFormSuccess.emit();
      });
  }

  ngOnInit(): void {
    this.priceDetail$ = this.store.select((store) => store.shared.price.detail);

    this.error$ = this.store.select((store) => store.shared.price.error);

    this.error$.subscribe((err) => {
      if (err && this.priceFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.priceFormCmp.priceForm,
          err
        );
      }
    });
  }

  onSavePriceForm(priceForm: FormGroup) {
    if (priceForm.valid) {
      this.store.dispatch(new AddPriceAction(priceForm.value));
    }
  }

  onUpdatePriceForm(priceObj: any) {
    if (priceObj.priceForm.valid) {
      this.store.dispatch(
        new UpdatePriceAction(priceObj.priceId, priceObj.priceForm.value)
      );
    }
  }

  onCancelPriceForm() {}

  onEditPrice(priceId: any) {
    this.formEditState = true;
    CommonUtilities.goToId("price-form");
    this.store.dispatch(new GetPriceAction(parseInt(priceId, 10)));
  }

  goToDeliveryLocation() {
    this.redirectTo(AppRoutes.DELIVERY_LOCATION_PAGE);
  }
}
