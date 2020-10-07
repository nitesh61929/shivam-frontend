import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "@core/enums";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { AnnouncementService } from "../../services/announcement.service";
import {
  AddUpdateAnnouncementAction,
  AddUpdateAnnouncementFailureAction,
  AddUpdateAnnouncementSuccessAction,
  AnnouncementActionTypes,
  DeleteAnnouncementAction,
  DeleteAnnouncementFailureAction,
  DeleteAnnouncementSuccessAction,
  GetAnnouncementAction,
  GetAnnouncementFailureAction,
  GetAnnouncementSuccessAction,
  LoadAnnouncementAction,
  LoadAnnouncementFailureAction,
  LoadAnnouncementSuccessAction,
  ToggleAnnouncementAction,
  ToggleAnnouncementFailureAction,
  ToggleAnnouncementSuccessAction,
} from "../actions/announcement.actions";

@Injectable()
export class AnnouncementEffects {
  constructor(
    private actions$: Actions,
    private announcementService: AnnouncementService,
    private translate: TranslateService,
    private router: Router,
    private snackbar: SnackBarService
  ) {}

  @Effect() loadAnnouncement$ = this.actions$.pipe(
    ofType<LoadAnnouncementAction>(AnnouncementActionTypes.LOAD_ANNOUNCEMENT),
    mergeMap((d) =>
      this.announcementService.getAnnouncements(d.param).pipe(
        map((data) => {
          return new LoadAnnouncementSuccessAction(data);
        }),
        catchError((error) => of(new LoadAnnouncementFailureAction(error)))
      )
    )
  );

  @Effect() addUpdateAnnouncement$ = this.actions$.pipe(
    ofType<AddUpdateAnnouncementAction>(
      AnnouncementActionTypes.ADD_UPDATE_ANNOUNCEMENT
    ),
    mergeMap((data) =>
      this.announcementService.updateAnnouncement(data.payload).pipe(
        map(() => new AddUpdateAnnouncementSuccessAction(data.payload)),
        catchError((error) => of(new AddUpdateAnnouncementFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  addUpdateAnnouncementSuccess$ = this.actions$.pipe(
    ofType(AnnouncementActionTypes.ADD_UPDATE_ANNOUNCEMENT_SUCCESS),
    tap((response: any) => {
      if (!response.payload.id) {
        this.snackbar.open(
          this.translate.instant("item_added_message"),
          "success"
        );
        this.router.navigateByUrl(AppRoutes.ANNOUNCEMENT_PAGE);
      }
    })
  );

  @Effect() getAnnouncement$ = this.actions$.pipe(
    ofType<GetAnnouncementAction>(AnnouncementActionTypes.GET_ANNOUNCEMENT),
    mergeMap((data) =>
      this.announcementService.getAnnouncementDetail(data.id).pipe(
        map((product) => {
          return new GetAnnouncementSuccessAction(product);
        }),
        catchError((error) => of(new GetAnnouncementFailureAction(error)))
      )
    )
  );

  @Effect() deleteAnnouncement$ = this.actions$.pipe(
    ofType<DeleteAnnouncementAction>(
      AnnouncementActionTypes.DELETE_ANNOUNCEMENT
    ),
    mergeMap((data) =>
      this.announcementService.deleteAnnouncement(data.id).pipe(
        map(() => new DeleteAnnouncementSuccessAction(data.id)),
        catchError((error) => of(new DeleteAnnouncementFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteAnnouncementSuccess$ = this.actions$.pipe(
    ofType(AnnouncementActionTypes.DELETE_ANNOUNCEMENT_SUCCESS),
    tap((response) => {
      this.snackbar.open(
        this.translate.instant("item_deleted_message"),
        "success"
      );
    })
  );

  @Effect() toggleAnnouncement$ = this.actions$.pipe(
    ofType<ToggleAnnouncementAction>(
      AnnouncementActionTypes.TOGGLE_ANNOUNCEMENT
    ),
    mergeMap((d) =>
      this.announcementService.updateStatus(d.id, d.payload).pipe(
        map((data) => {
          return new ToggleAnnouncementSuccessAction(data);
        }),
        catchError((error) => of(new ToggleAnnouncementFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  toggleAnnouncementSuccess$ = this.actions$.pipe(
    ofType(AnnouncementActionTypes.TOGGLE_ANNOUNCEMENT_SUCCESS),
    tap((response: any) => {
      const infoMessage = this.translate.instant("item_updated_message");
      this.snackbar.open(infoMessage, "success");
      this.router.navigateByUrl(AppRoutes.ANNOUNCEMENT_PAGE);
    })
  );

  // onSuccess(announcementResponse: IAnnouncement) {
  //   const infoMessage = announcementResponse.id
  //     ? this.translate.instant("item_updated_message")
  //     : this.translate.instant("item_added_message");
  //   this.router.navigateByUrl(AppRoutes.ANNOUNCEMENT_PAGE);
  //   this.snackbar.open(infoMessage, "success");
  // }
}
