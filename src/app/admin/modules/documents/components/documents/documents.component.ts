import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { CommonValidators } from "@core/validators";
import { IFormOptions } from "@shared/form/interfaces/form-options";
import { IPageHeaderOptions } from "@shared/page-header";
import { EDocumentType } from "../../enums/document-type";
import { IDocument } from "../../interfaces";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
})
export class DocumentsComponent extends BaseComponent implements OnInit {
  @Output() termsAndConditionChange: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Output() privacyPolicyChange: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Input() termsAndConditions: IDocument;
  @Input() privacyPolicy: IDocument;
  pageHeaderOptions: IPageHeaderOptions;
  termsAndConditionForm: FormGroup;
  privacyPolicyForm: FormGroup;
  formOptions: IFormOptions;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setFormOptions();
    this.createTermsAndConditionForm();
    this.createPrivacyPolicyForm();
  }

  onSaveDocumentsForm() {}
  onCancelDocumentsForm() {}

  private createTermsAndConditionForm() {
    this.termsAndConditionForm = this.formBuilder.group({
      resource_path: [
        "",
        [
          CommonValidators.checkFileType(["pdf"]),
          CommonValidators.checkFileSize(),
        ],
      ],
      type: [EDocumentType.terms_and_conditions],
    });

    this.termsAndConditionForm.valueChanges.subscribe((document: IDocument) => {
      if (document) {
        this.termsAndConditionChange.emit(this.termsAndConditionForm);
      }
    });
  }

  private createPrivacyPolicyForm() {
    this.privacyPolicyForm = this.formBuilder.group({
      resource_path: [
        "",
        [
          CommonValidators.checkFileType(["pdf"]),
          CommonValidators.checkFileSize(),
        ],
      ],
      type: [EDocumentType.privacy_policy],
    });

    this.privacyPolicyForm.valueChanges.subscribe((document: IDocument) => {
      if (document) {
        this.privacyPolicyChange.emit(this.privacyPolicyForm);
      }
    });
  }

  private setFormOptions() {
    this.formOptions = {
      headerTitle: this.translateService.instant("documents"),
      formClass: "documents-form full",
    };
  }

  onClearPrivacyPolicy() {
    this.termsAndConditionForm.get("resource_path").reset();
  }

  onClearTermsAndConditions() {
    this.privacyPolicyForm.get("resource_path").reset();
  }
}
