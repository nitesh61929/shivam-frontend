import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { BaseComponent } from "@core/components";
import { IFormOptions } from "./interfaces/form-options";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
})
export class FormComponent extends BaseComponent implements OnInit {
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Input() formOptions: IFormOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  onSave(): void {
    this.save.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getSaveBtnLabel(): string {
    const saveBtnLabel = this.formOptions?.saveBtnLabel
      ? this.translateService.instant(this.formOptions.saveBtnLabel)
      : null;
    return saveBtnLabel;
  }

  getCancelBtnLabel(): string {
    const cancelBtnLabel = this.formOptions?.cancelBtnLabel
      ? this.translateService.instant(this.formOptions.cancelBtnLabel)
      : null;
    return cancelBtnLabel;
  }

  getHeaderTitle(): string {
    const headerTitle = this.formOptions?.headerTitle
      ? this.translateService.instant(this.formOptions.headerTitle)
      : this.translateService.instant("form_title_label");
    return headerTitle;
  }
}
