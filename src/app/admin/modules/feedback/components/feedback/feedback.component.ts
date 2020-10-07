import { Component, OnInit } from "@angular/core";
import { AppPermissions } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
})
export class FeedbackComponent implements OnInit {
  pageHeaderOptions: IPageHeaderOptions;
  hasListAccess = AppPermissions.LIST_FEEDBACK;

  constructor() {}

  ngOnInit(): void {
    this.pageHeaderOptions = {
      title: "feedback_label",
      showAddBtn: false,
    };
  }
}
