import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppPermissions, AppRoutes, EModuleAllocation } from "@core/enums";
import { EAnnouncementStatus } from "../../enums";
import { IAnnouncement } from "../../interfaces/announcement";

@Component({
  selector: "app-announcement-detail",
  templateUrl: "./announcement-detail.component.html",
})
export class AnnouncementDetailComponent extends BaseComponent
  implements OnInit {
  @Output() editAnnouncement: EventEmitter<number> = new EventEmitter<number>();
  @Input() announcementDetail: IAnnouncement;
  hasEditAccess = AppPermissions.EDIT_ANNOUNCEMENT;
  moduleAllocationEnum = EModuleAllocation;
  announcementStatusEnum = EAnnouncementStatus;
  videoPlaying: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  onBackClick() {
    this.redirectTo(AppRoutes.ANNOUNCEMENT_PAGE);
  }

  onEditClick() {
    this.editAnnouncement.emit(this.announcementDetail.id);
  }

  getStatusClass(announcementDetail) {
    return announcementDetail.status === 0 ? "unpublished" : "published";
  }

  isImage(resourceType: string) {
    if (this.globalDatas.checkFileFormat(resourceType) === "image") {
      return true;
    } else {
      return false;
    }
  }

  onPlayIconClick() {
    this.videoPlaying = !this.videoPlaying;
    const vid: any = document.getElementById("announcement-video");
    vid.play();
  }

  isClassPlaying(announcementDetail: any) {
    return !announcementDetail.thumbnail || this.videoPlaying ? true : false;
  }
}
