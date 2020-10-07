import { Component, OnInit } from "@angular/core";
import { AppPermissions } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-taxation",
  templateUrl: "./taxation.component.html",
})
export class TaxationComponent implements OnInit {
  pageHeaderOptions: IPageHeaderOptions;
  hasListAccess = AppPermissions.LIST_TAXATION;

  constructor() {}

  ngOnInit(): void {
    this.pageHeaderOptions = {
      title: "charges",
      showAddBtn: false,
    };
  }
}
