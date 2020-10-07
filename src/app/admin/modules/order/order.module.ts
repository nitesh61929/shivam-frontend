import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "@shared/shared.module";
import { OrderDetailComponent } from "./components/order-detail/order-detail.component";
import { OrdersListComponent } from "./components/orders-list/orders-list.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { OrderDetailContainerComponent } from "./containers/order-detail/order-detail-container.component";
import { OrdersListContainerComponent } from "./containers/orders-list/orders-list-container.component";
import { OrdersContainerComponent } from "./containers/orders/orders-container.component";
import { OrderRoutingModule } from "./order-routing.module";
import { OrderEffects, OrderReducer } from "./store";
import { AssignDealerComponent } from './components/assign-dealer/assign-dealer.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrdersListComponent,
    OrdersContainerComponent,
    OrdersListContainerComponent,
    OrderDetailComponent,
    OrderDetailContainerComponent,
    AssignDealerComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    StoreModule.forFeature("order", OrderReducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
})
export class OrderModule {}
