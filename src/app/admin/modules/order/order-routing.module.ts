import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OnlineDeliveryPartnersResolver } from "@shared/route-resolvers";
import {
  OrderDetailContainerComponent,
  OrdersContainerComponent,
} from "./containers";
import { OrderDetailResolver } from "./route-resolvers/order-detail.resolver";

const routes: Routes = [
  {
    path: "",
    component: OrdersContainerComponent,
  },
  {
    path: "detail/:id",
    component: OrderDetailContainerComponent,
    resolve: {
      onlineDeliveryPartners: OnlineDeliveryPartnersResolver,
      orderDetail: OrderDetailResolver,
    },
    runGuardsAndResolvers: "always",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
