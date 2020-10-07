import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPermissions } from "@core/enums";
import { PermissionGuard } from "@core/guards/permission/permission.guard";
import { PermissionResolver } from "@core/route-resolvers";
import { OnlineDeliveryPartnerContainerComponent } from "./containers";
import { OnlineDeliveryPartnerDetailContainerComponent } from "./containers/online-delivery-partner-detail";
import { OnlineDeliveryPartnerFormContainerComponent } from "./containers/online-delivery-partner-form";
import { ErpDealersResolver } from "./route-resolvers/erp-dealers.resolver";

const routes: Routes = [
  {
    path: "",
    component: OnlineDeliveryPartnerContainerComponent,
  },

  {
    path: "create",
    component: OnlineDeliveryPartnerFormContainerComponent,
    resolve: {
      permissions: PermissionResolver,
      erpDealers: ErpDealersResolver,
    },
    data: {
      hasAccess: AppPermissions.ADD_DEALER,
    },
  },
  {
    path: "detail/:id",
    component: OnlineDeliveryPartnerDetailContainerComponent,
    data: {
      hasAccess: AppPermissions.VIEW_DEALER,
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "edit/:id",
    component: OnlineDeliveryPartnerFormContainerComponent,
    resolve: {
      permissions: PermissionResolver,
      erpDealers: ErpDealersResolver,
    },
    data: {
      hasAccess: AppPermissions.EDIT_DEALER,
    },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineDeliveryPartnerRoutingModule {}
