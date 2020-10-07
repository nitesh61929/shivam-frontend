import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import {
  OnlineDeliveryPartnerComponent,
  OnlineDeliveryPartnerDetailComponent,
  OnlineDeliveryPartnerFormComponent,
  OnlineDeliveryPartnerListComponent,
} from "./components";
import {
  OnlineDeliveryPartnerContainerComponent,
  OnlineDeliveryPartnerFormContainerComponent,
  OnlineDeliveryPartnerListContainerComponent,
} from "./containers";
import { OnlineDeliveryPartnerDetailContainerComponent } from "./containers/online-delivery-partner-detail/online-delivery-partner-detail-container.component";
import { OnlineDeliveryPartnerRoutingModule } from "./online-delivery-partner-routing.module";

@NgModule({
  declarations: [
    OnlineDeliveryPartnerComponent,
    OnlineDeliveryPartnerListComponent,
    OnlineDeliveryPartnerContainerComponent,
    OnlineDeliveryPartnerListContainerComponent,
    OnlineDeliveryPartnerDetailComponent,
    OnlineDeliveryPartnerFormComponent,
    OnlineDeliveryPartnerDetailContainerComponent,
    OnlineDeliveryPartnerFormContainerComponent,
  ],
  imports: [CommonModule, OnlineDeliveryPartnerRoutingModule, SharedModule],
})
export class OnlineDeliveryPartnerModule {}
