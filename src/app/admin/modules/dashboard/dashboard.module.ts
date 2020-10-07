import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "@shared/shared.module";
import { DashboardComponent } from "./components/dashboard.component";
import { DashboardContainerComponent } from "./containers/dashboard-container.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardEffects, DashboardReducer } from "./store";

@NgModule({
  declarations: [DashboardContainerComponent, DashboardComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature("dashboard", DashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
})
export class DashboardModule {}
