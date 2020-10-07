import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "@shared/shared.module";
import { AnnouncementRoutingModule } from "./announcement-routing.module";
import { AnnouncementDetailComponent } from "./components/announcement-detail/announcement-detail.component";
import { AnnouncementFormComponent } from "./components/announcement-form/announcement-form.component";
import { AnnouncementListComponent } from "./components/announcement-list/announcement-list.component";
import { AnnouncementComponent } from "./components/announcement/announcement.component";
import { AnnouncementDetailContainerComponent } from "./containers/announcement-detail/announcement-detail-container.component";
import { AnnouncementFormContainerComponent } from "./containers/announcement-form/announcement-form-container.component";
import { AnnouncementListContainerComponent } from "./containers/announcement-list/announcement-list-container.component";
import { AnnouncementContainerComponent } from "./containers/announcement/announcement-container.component";
import { AnnouncementEffects } from "./store/effects/announcement.effects";
import { AnnouncementReducer } from "./store/reducers/announcement.reducer";

@NgModule({
  declarations: [
    AnnouncementContainerComponent,
    AnnouncementListComponent,
    AnnouncementListContainerComponent,
    AnnouncementFormContainerComponent,
    AnnouncementDetailContainerComponent,
    AnnouncementDetailComponent,
    AnnouncementFormComponent,
    AnnouncementComponent,
  ],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    SharedModule,
    StoreModule.forFeature("announcement", AnnouncementReducer),
    EffectsModule.forFeature([AnnouncementEffects]),
  ],
})
export class AnnouncementModule {}
