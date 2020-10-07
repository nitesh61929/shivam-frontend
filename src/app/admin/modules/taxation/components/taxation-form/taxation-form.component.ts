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
import { IFormOptions } from "@shared/form/interfaces/form-options";
import { Observable } from "rxjs";
import { ITaxation } from "../../interfaces";

@Component({
  selector: "app-taxation-form",
  templateUrl: "./taxation-form.component.html",
})
export class TaxationFormComponent extends BaseComponent implements OnInit {
  @Output() updateTaxation: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Output() cancelTaxation: EventEmitter<null> = new EventEmitter<null>();
  @Input() taxationDetail$: Observable<ITaxation>;

  taxationForm: FormGroup;
  formOptions: IFormOptions;
  taxationDetail: ITaxation;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.createTaxationForm();
    this.taxationDetail$.subscribe((taxationDetail: ITaxation) => {
      if (taxationDetail) {
        this.taxationForm.patchValue(taxationDetail);
        this.formOptions = {
          headerTitle: "edit_taxation_label",
          saveBtnLabel: "update_label",
          cancelBtnLabel: "cancel_label",
          formClass: "taxation-form",
        };
      }
    });
  }

  onUpdateTaxationForm() {
    this.updateTaxation.emit(this.taxationForm);
  }

  onCancelTaxationForm() {
    this.cancelTaxation.emit();
  }

  private createTaxationForm() {
    this.taxationForm = this.formBuilder.group({
      id: [""],
      active: [true],
      name: [{ value: "", disabled: true }],
      value: ["", Validators.required],
    });
  }
}
