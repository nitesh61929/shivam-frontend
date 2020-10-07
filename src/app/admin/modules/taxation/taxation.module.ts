import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "@shared/shared.module";
import { TaxationFormComponent } from "./components/taxation-form/taxation-form.component";
import { TaxationListComponent } from "./components/taxation-list/taxation-list.component";
import { TaxationComponent } from "./components/taxation/taxation.component";
import { TaxationFormContainerComponent } from "./containers/taxation-form/taxation-form-container.component";
import { TaxationListContainerComponent } from "./containers/taxation-list/taxation-list-container.component";
import { TaxationContainerComponent } from "./containers/taxation/taxation-container.component";
import { TaxationEffects, TaxationReducer } from "./store";
import { TaxationRoutingModule } from "./taxation-routing.module";

@NgModule({
  declarations: [
    TaxationListComponent,
    TaxationListContainerComponent,
    TaxationContainerComponent,
    TaxationComponent,
    TaxationFormComponent,
    TaxationFormContainerComponent,
  ],
  imports: [
    CommonModule,
    TaxationRoutingModule,
    SharedModule,
    StoreModule.forFeature("taxation", TaxationReducer),
    EffectsModule.forFeature([TaxationEffects]),
  ],
})
export class TaxationModule {}
