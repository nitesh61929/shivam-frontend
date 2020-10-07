import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "@shared/shared.module";
import { PaymentListComponent } from "./components/payment-list/payment-list.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { PaymentListContainerComponent } from "./containers/payment-list/payment-list-container.component";
import { PaymentContainerComponent } from "./containers/payment/payment-container.component";
import { PaymentRoutingModule } from "./payment-routing.module";
import { PaymentEffects, PaymentReducer } from "./store";

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentContainerComponent,
    PaymentListComponent,
    PaymentListContainerComponent,
  ],
  imports: [
    PaymentRoutingModule,
    SharedModule,
    StoreModule.forFeature("payment", PaymentReducer),
    EffectsModule.forFeature([PaymentEffects]),
  ],
})
export class PaymentModule {}
