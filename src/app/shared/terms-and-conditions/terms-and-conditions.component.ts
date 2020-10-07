import { Component, Injector, OnInit } from "@angular/core";
import { IDocument } from "@app/admin/modules/documents/interfaces";
import { BaseComponent } from "@core/components";

@Component({
  selector: "app-terms-and-conditions",
  templateUrl: "./terms-and-conditions.component.html",
})
export class TermsAndConditionsComponent extends BaseComponent
  implements OnInit {
  termsAndConditions: IDocument;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.termsAndConditions = data.termsAndConditions;
    });
  }
}
