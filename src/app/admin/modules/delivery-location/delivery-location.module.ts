import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import {
  DeliveryLocationComponent,
  DeliveryLocationDetailComponent,
  DeliveryLocationFormComponent,
  DeliveryLocationListComponent,
} from "./components";
import {
  DeliveryLocationContainerComponent,
  DeliveryLocationDetailContainerComponent,
  DeliveryLocationFormContainerComponent,
  DeliveryLocationListContainerComponent,
} from "./containers";
import { DeliveryLocationRoutingModule } from "./delivery-location-routing.module";

@NgModule({
  declarations: [
    DeliveryLocationContainerComponent,
    DeliveryLocationComponent,
    DeliveryLocationFormComponent,
    DeliveryLocationListComponent,
    DeliveryLocationListContainerComponent,
    DeliveryLocationFormContainerComponent,
    DeliveryLocationDetailContainerComponent,
    DeliveryLocationDetailComponent,
  ],
  imports: [SharedModule, DeliveryLocationRoutingModule],
})
export class DeliveryLocationModule {}
