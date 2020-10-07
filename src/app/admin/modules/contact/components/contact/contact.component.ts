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
import { IPages } from "@shared/interfaces";
import { Observable } from "rxjs";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
})
export class ContactComponent extends BaseComponent implements OnInit {
  @Output() saveOrUpdateContact: EventEmitter<FormGroup> = new EventEmitter<
    FormGroup
  >();
  @Input() pages$: Observable<IPages[]>;
  formOptions: IFormOptions;
  contactForm: FormGroup;
  submitted: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.createContactForm();
    this.pages$.subscribe((pages) => {
      if (pages && pages.length > 0) {
        this.buildContactForm(pages);
      }
    });
    this.setFormOptions();
  }

  buildContactForm(configurations) {
    this.contactForm.patchValue(configurations[0]);
    this.setFormOptions();
  }

  onSaveContactForm() {
    this.submitted = true;
    this.saveOrUpdateContact.emit(this.contactForm);
  }

  private setFormOptions() {
    if (this.contactForm.get("id").value) {
      this.formOptions = {
        headerTitle: this.translateService.instant("pages"),
        formClass: "contact-form full",
        saveBtnLabel: "update_label",
      };
    } else {
      this.formOptions = {
        headerTitle: this.translateService.instant("pages"),
        formClass: "contact-form full",
        saveBtnLabel: "save_label",
      };
    }
  }

  private createContactForm() {
    this.contactForm = this.formBuilder.group({
      id: [],
      type: ["contact_us"],
      description: ["", Validators.required],
    });
  }
}
