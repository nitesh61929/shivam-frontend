import { Component, OnInit } from "@angular/core";
import { AppPermissions } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-consumers",
  templateUrl: "./consumers.component.html",
})
export class ConsumersComponent implements OnInit {
  pageHeaderOptions: IPageHeaderOptions;
  hasListAccess = AppPermissions.LIST_CONSUMER;

  constructor() {}

  ngOnInit(): void {
    this.setPageHeaderOptions();
  }

  setPageHeaderOptions() {
    this.pageHeaderOptions = {
      title: "consumers",
      showAddBtn: false,
    };
  }
}
