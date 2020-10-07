import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppPermissions, AppRoutes } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-announcement",
  templateUrl: "./announcement.component.html",
})
export class AnnouncementComponent extends BaseComponent implements OnInit {
  pageHeaderOptions: IPageHeaderOptions;
  hasListAccess = AppPermissions.LIST_ANNOUNCEMENT;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageHeaderOptions();
  }

  setPageHeaderOptions() {
    this.pageHeaderOptions = {
      title: "announcement",
      showAddBtn: true,
      hasAddAccess: AppPermissions.ADD_ANNOUNCEMENT,
    };
  }

  onAddPromotion() {
    this.redirectTo(AppRoutes.ANNOUNCEMENT_CREATE_PAGE);
  }
}
