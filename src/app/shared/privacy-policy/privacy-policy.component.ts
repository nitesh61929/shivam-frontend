import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { IDocument } from "@shared/interfaces";

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
})
export class PrivacyPolicyComponent extends BaseComponent implements OnInit {
  privacyPolicy: IDocument;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.privacyPolicy = data.privacyPolicy;
    });
  }
}
