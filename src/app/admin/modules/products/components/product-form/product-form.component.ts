import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { IData } from "@core/interfaces";
import { CommonValidators } from "@core/validators";
import { IFormOptions } from "@shared/form/interfaces/form-options";
import { Observable } from "rxjs";
import { IProduct } from "../../interfaces";
import { CompareQuantity } from "../../validators";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
})
export class ProductFormComponent extends BaseComponent implements OnInit {
  @Input() productDetail$: Observable<IProduct>;
  @Input() moduleAllocations: IData[];
  @Output() saveOrUpdateProduct: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Output() cancelProduct: EventEmitter<any> = new EventEmitter<any>();

  productForm: FormGroup;
  formOptions: IFormOptions;
  productDetail: IProduct;
  isSubmitted = false;
  fileSrc: string;

  constructor(injector: Injector) {
    super(injector);
  }

  onClearFile() {
    this.productForm.get("image_url").reset();
  }

  ngOnInit(): void {
    this.createProductForm();
    const productId = this.activatedRoute.snapshot.paramMap.get("id");
    if (productId) {
      this.productDetail$.subscribe((productDetail: IProduct) => {
        if (productDetail) {
          this.productForm.patchValue(productDetail);
          this.fileSrc = productDetail.image_url;
          this.formOptions = {
            headerTitle: "edit_product_label",
            saveBtnLabel: "update_label",
            cancelBtnLabel: "cancel_label",
            formClass: "product-form full",
          };
        }
      });
    } else {
      this.formOptions = {
        headerTitle: "add_product_label",
        saveBtnLabel: "save_label",
        cancelBtnLabel: "cancel_label",
        formClass: "product-form full",
      };
    }
  }

  private createProductForm() {
    this.productForm = this.formBuilder.group(
      {
        id: [""],
        active: [1],
        name: ["", Validators.required],
        is_for_consumer: ["", Validators.required],
        min_order_quantity: ["", Validators.required],
        max_order_quantity: ["", Validators.required],
        image_url: [
          "",
          Validators.compose([
            Validators.required,
            CommonValidators.checkFileType(["png", "jpg", "jpeg", "gif"]),
            CommonValidators.checkFileSize(),
          ]),
        ],
        meta_description: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(200),
          ],
        ],
        description: ["", [Validators.maxLength(500)]],
      },
      { validator: CompareQuantity() }
    );
  }

  onSaveOrUpdateProductForm() {
    this.isSubmitted = true;
    this.saveOrUpdateProduct.emit(this.productForm);
  }

  onCancelProductForm() {
    this.cancelProduct.emit();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get("image_url").setValue(file);
    }
  }
}
