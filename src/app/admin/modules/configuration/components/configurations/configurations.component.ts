import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppPermissions } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-configurations",
  templateUrl: "./configurations.component.html",
})
export class ConfigurationsComponent implements OnInit {
  pageHeaderOptions: IPageHeaderOptions;
  hasEditAccess = AppPermissions.EDIT_CONFIGURATION;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.pageHeaderOptions = {
      title: "configurations",
      showAddBtn: false,
    };
  }

  onAddConfiguration() {
    this.router.navigate(["/admin/configuration/create"]);
  }
}
