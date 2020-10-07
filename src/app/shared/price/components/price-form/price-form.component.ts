import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { IProduct } from "@app/admin/modules/products";
import { BaseComponent } from "@core/components";
import { IDeliveryLocation } from "@shared/interfaces";
import { CompareFOC, ComparePriceDiscount } from "@shared/price";
import { IPrice } from "@shared/price/interfaces";
import { Observable } from "rxjs";

interface Location {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-price-form",
  templateUrl: "./price-form.component.html",
})
export class PriceFormComponent extends BaseComponent implements OnInit {
  @ViewChild(FormGroupDirective) priceFormDirective;
  @Output() savePriceForm: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Output() updatePriceForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelPriceForm: EventEmitter<null> = new EventEmitter<null>();
  @Input() deliveryLocationList: IDeliveryLocation[];
  @Input() productId: number;
  @Input() priceDetail$: Observable<IPrice>;
  @Input() formEditState: boolean;
  @Input() productDetail: IProduct;
  priceDetail: IPrice;
  priceForm: FormGroup;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPriceForm();
    this.priceDetail$.subscribe((priceDetail) => {
      if (priceDetail && this.formEditState) {
        this.priceDetail = priceDetail;
        this.resetForm();
        this.priceForm.patchValue(priceDetail);
        this.priceForm
          .get("delivery_location_id")
          .setValue(priceDetail.delivery_location.id);
        this.priceForm.get("delivery_location_id").disable();
      }
    });
  }

  private setPriceForm() {
    this.priceForm = this.formBuilder.group(
      {
        id: [],
        price: ["", [Validators.required, Validators.min(1)]],
        unit: ["", Validators.required],
        foc_eligible_count: [
          "",
          [
            Validators.required,
            Validators.max(this.productDetail.max_order_quantity),
            // Validators.min(this.productDetail.min_order_quantity),
          ],
        ],
        foc: ["", Validators.required],
        discount_amount: ["", Validators.required],
        product_id: [""],
        price_id: [""],
        delivery_location_id: ["", Validators.required],
      },
      { validator: [CompareFOC(), ComparePriceDiscount()] }
    );
  }

  onSaveOrUpdate() {
    this.priceForm.get("product_id").setValue(this.productId);
    if (this.priceDetail) {
      const priceObj = {
        priceId: this.priceDetail.id,
        priceForm: this.priceForm,
      };
      this.updatePriceForm.emit(priceObj);
    } else {
      this.savePriceForm.emit(this.priceForm);
    }
  }

  onCancel() {
    this.priceDetail = null;
    this.resetForm();
    this.cancelPriceForm.emit();
  }

  resetForm() {
    if (this.priceFormDirective) {
      this.priceFormDirective.resetForm();
      this.priceForm.reset();
    }
  }

  getSaveLabel() {
    if (this.priceDetail) {
      return this.translateService.instant("update_label");
    } else {
      return this.translateService.instant("save_label");
    }
  }
}
