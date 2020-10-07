import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { IAnnouncement } from "../../interfaces/announcement";

@Component({
  selector: "app-announcement-detail-container",
  templateUrl: "./announcement-detail-container.component.html",
})
export class AnnouncementDetailContainerComponent extends BaseComponent
  implements OnInit {
  announcementDetail: IAnnouncement;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.announcementDetail = data.announcementDetail;
    });
  }

  onEditAnnouncement(announcementId: number) {
    this.redirectTo(`${AppRoutes.ANNOUNCEMENT_UPDATE_PAGE}/${announcementId}`);
  }
}
