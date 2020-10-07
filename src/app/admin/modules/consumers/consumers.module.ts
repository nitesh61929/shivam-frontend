import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ConsumerDetailComponent } from "./components/consumer-detail/consumer-detail.component";
import { ConsumerFormComponent } from "./components/consumer-form/consumer-form.component";
import { ConsumersListComponent } from "./components/consumers-list/consumers-list.component";
import { ConsumersComponent } from "./components/consumers/consumers.component";
import { ConsumersRoutingModule } from "./consumers-routing.module";
import { ConsumerDetailContainerComponent } from "./containers/consumer-detail/consumer-detail-container.component";
import { ConsumerFormContainerComponent } from "./containers/consumer-form/consumer-form-container.component";
import { ConsumersListContainerComponent } from "./containers/consumers-list/consumers-list-container.component";
import { ConsumersContainerComponent } from "./containers/consumers/consumers-container.component";

@NgModule({
  declarations: [
    ConsumersComponent,
    ConsumersListComponent,
    ConsumersContainerComponent,
    ConsumersListContainerComponent,
    ConsumerFormComponent,
    ConsumerFormContainerComponent,
    ConsumerDetailComponent,
    ConsumerDetailContainerComponent,
  ],
  imports: [CommonModule, ConsumersRoutingModule, SharedModule],
})
export class ConsumersModule {}
