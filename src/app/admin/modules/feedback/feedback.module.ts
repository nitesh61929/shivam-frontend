import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "@shared/shared.module";
import { FeedbackListComponent } from "./components/feedback-list/feedback-list.component";
import { FeedbackComponent } from "./components/feedback/feedback.component";
import { FeedbackListContainerComponent } from "./containers/feedback-list/feedback-list-container.component";
import { FeedbackContainerComponent } from "./containers/feedback/feedback-container.component";
import { FeedbackRoutingModule } from "./feedback-routing.module";
import { FeedbackEffects, FeedbackReducer } from "./store";

@NgModule({
  declarations: [
    FeedbackComponent,
    FeedbackListComponent,
    FeedbackContainerComponent,
    FeedbackListContainerComponent,
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule,
    StoreModule.forFeature("feedback", FeedbackReducer),
    EffectsModule.forFeature([FeedbackEffects]),
  ],
})
export class FeedbackModule {}
