import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { IAnnouncement } from "../interfaces/announcement";
import { GetAnnouncementAction } from "../store/actions";

@Injectable({
  providedIn: "root",
})
export class AnnouncementDetailResolver implements Resolve<any> {
  announcementDetail$: Observable<IAnnouncement>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    const announcementId = route.params.id;
    this.store.dispatch(
      new GetAnnouncementAction(parseInt(announcementId, 10))
    );

    this.announcementDetail$ = this.store.select(
      (store) => store.announcement.detail
    );
    return this.announcementDetail$.pipe(
      take(2),
      map((announcementDetail: IAnnouncement) => announcementDetail)
    );
  }
}
