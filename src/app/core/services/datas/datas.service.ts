import { Injectable } from "@angular/core";
import { IData } from "@core/interfaces";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { of } from "rxjs/internal/observable/of";

@Injectable({
  providedIn: "root",
})
export class DatasService {
  moduleAllocations: IData[] = [
    {
      value: 0,
      title: "online_delivery_partners",
    },
    {
      value: 1,
      title: "consumer",
    },
  ];

  roleModules: IData[] = [
    {
      value: "online_delivery_partner",
      title: "online_delivery_partners",
    },
    {
      value: "consumer",
      title: "consumer",
    },
  ];

  feedbackTypes: IData[] = [
    {
      value: "0",
      title: "order_feedback",
    },
    {
      value: "1",
      title: "general_feedback",
    },
  ];

  ratings = [];

  imageFormats = ["jpg", "jpeg", "png", "gif"];
  videoFormats = ["mp4"];

  constructor(private translateService: TranslateService) {}

  orderStatuses() {
    const orderStatuses: IData[] = [
      {
        value: "UNPAID",
        title: this.translateService.instant("unpaid"),
      },
      {
        value: "PROCESSING",
        title: this.translateService.instant("processing"),
      },
      {
        value: "ALLOCATED",
        title: this.translateService.instant("allocated"),
      },
      {
        value: "CONFIRMED",
        title: this.translateService.instant("confirmed"),
      },
      {
        value: "DELIVERED",
        title: this.translateService.instant("delivered"),
      },
      {
        value: "COMPLETED",
        title: this.translateService.instant("completed"),
      },
      {
        value: "CANCELLED",
        title: this.translateService.instant("cancelled"),
      },
    ];
    return orderStatuses;
  }

  announcementTypes() {
    const announcementTypes: IData[] = [
      {
        value: "promotion",
        title: this.translateService.instant("promotion"),
      },
      {
        value: "scheme",
        title: this.translateService.instant("scheme"),
      },
    ];
    return announcementTypes;
  }

  getModuleAllocations(): Observable<IData[]> {
    return of(this.moduleAllocations);
  }

  getRoleModules(): Observable<IData[]> {
    return of(this.roleModules);
  }

  getOrderStatuses(): Observable<IData[]> {
    return of(this.orderStatuses());
  }

  getFeedbackTypes(): Observable<IData[]> {
    return of(this.feedbackTypes);
  }

  getAnnouncementTypes(): Observable<IData[]> {
    return of(this.announcementTypes());
  }

  checkFileFormat(fileType: string) {
    if (this.imageFormats.indexOf(fileType) > -1) {
      return "image";
    }
    if (this.videoFormats.indexOf(fileType) > -1) {
      return "video";
    }
    if (fileType === "pdf") {
      return "pdf";
    }
  }

  getRatings(): Observable<number[]> {
    return of(Array(1, 2, 3, 4, 5));
  }
}
