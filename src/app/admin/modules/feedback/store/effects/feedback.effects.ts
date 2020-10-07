import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { FeedbackService } from "../../services";
import {
  FeedbackActionTypes,
  LoadFeedbackAction,
  LoadFeedbackFailureAction,
  LoadFeedbackSuccessAction,
} from "../actions";

@Injectable()
export class FeedbackEffects {
  constructor(
    private actions$: Actions,
    private feedbackService: FeedbackService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() loadFeedback$ = this.actions$.pipe(
    ofType<LoadFeedbackAction>(FeedbackActionTypes.LOAD_FEEDBACK),
    mergeMap((d) =>
      this.feedbackService.getFeedbacks(d.param).pipe(
        map((data) => {
          return new LoadFeedbackSuccessAction(data);
        }),
        catchError((error) => of(new LoadFeedbackFailureAction(error)))
      )
    )
  );
}
