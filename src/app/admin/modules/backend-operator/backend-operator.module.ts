import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "@shared/shared.module";
import { BackendOperatorRoutingModule } from "./backend-operator-routing.module";
import { BackendOperatorDetailComponent } from "./components/backend-operator-detail/backend-operator-detail.component";
import { BackendOperatorFormComponent } from "./components/backend-operator-form/backend-operator-form.component";
import { BackendOperatorListComponent } from "./components/backend-operator-list/backend-operator-list.component";
import { BackendOperatorComponent } from "./components/backend-operator/backend-operator.component";
import { ModuleConfigurationFormComponent } from "./components/module-configuration-form/module-configuration-form.component";
import { BackendOperatorDetailContainerComponent } from "./containers/backend-operator-detail/backend-operator-detail-container.component";
import { BackendOperatorFormContainerComponent } from "./containers/backend-operator-form/backend-operator-form-container.component";
import { BackendOperatorListContainerComponent } from "./containers/backend-operator-list/backend-operator-list-container.component";
import { BackendOperatorContainerComponent } from "./containers/backend-operator/backend-operator-container.component";
import { BackendOperatorReducer } from "./store";
import { BackendOperatorEffects } from "./store/effects/backend-operator.effects";

@NgModule({
  declarations: [
    BackendOperatorComponent,
    BackendOperatorListComponent,
    BackendOperatorFormComponent,
    BackendOperatorContainerComponent,
    BackendOperatorListContainerComponent,
    BackendOperatorFormContainerComponent,
    BackendOperatorDetailContainerComponent,
    BackendOperatorDetailComponent,
    ModuleConfigurationFormComponent,
  ],
  imports: [
    CommonModule,
    BackendOperatorRoutingModule,
    SharedModule,
    StoreModule.forFeature("backendOperator", BackendOperatorReducer),
    EffectsModule.forFeature([BackendOperatorEffects]),
  ],
})
export class BackendOperatorModule {}
