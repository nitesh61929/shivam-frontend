import { Injectable, Injector } from "@angular/core";
import { ApiUrls } from "@core/enums";
import { BaseService } from "@core/services";
import CommonUtilities from "@core/utilities/common-utilities";
import { Observable } from "rxjs";
import { IAnnouncement } from "../interfaces/announcement";

@Injectable({
  providedIn: "root",
})
export class AnnouncementService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  updateAnnouncement(announcementPayload: IAnnouncement): Observable<any> {
    return this.http.post(
      ApiUrls.PROMOTIONS,
      CommonUtilities.toFormData(announcementPayload)
    );
  }

  getAnnouncements(parameters: any): Observable<any> {
    return this.http.get(ApiUrls.PROMOTIONS, { params: parameters });
  }

  getAnnouncementDetail(announcementId: number): Observable<any> {
    return this.http.get(`${ApiUrls.PROMOTIONS}/${announcementId}`);
  }

  deleteAnnouncement(announcementId: number): Observable<any> {
    return this.http.delete(`${ApiUrls.PROMOTIONS}/${announcementId}`);
  }

  updateStatus(announcementId: number, statusPayload: any) {
    return this.http.patch(
      `${ApiUrls.PROMOTIONS}/${announcementId}/change-status`,
      statusPayload
    );
  }
}
