import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPermissions } from "@core/enums";
import { PermissionGuard } from "@core/guards/permission/permission.guard";
import { ProvincesWithDistrictsResolver } from "@shared/route-resolvers";
import {
  DeliveryLocationContainerComponent,
  DeliveryLocationFormContainerComponent,
} from "./containers";
import { DeliveryLocationDetailContainerComponent } from "./containers/delivery-location-detail";
import { DeliveryLocationDetailResolver } from "./route-resolvers";

const routes: Routes = [
  {
    path: "",
    component: DeliveryLocationContainerComponent,
  },
  {
    path: "create",
    component: DeliveryLocationFormContainerComponent,
    resolve: {
      provincesWithDistricts: ProvincesWithDistrictsResolver,
    },
    data: {
      hasAccess: AppPermissions.ADD_DELIVERY_LOCATION,
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "edit/:id",
    component: DeliveryLocationFormContainerComponent,
    resolve: {
      deliveryLocationDetail: DeliveryLocationDetailResolver,
      provincesWithDistricts: ProvincesWithDistrictsResolver,
    },
    data: {
      hasAccess: AppPermissions.EDIT_DELIVERY_LOCATION,
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "detail/:id",
    component: DeliveryLocationDetailContainerComponent,
    data: {
      hasAccess: AppPermissions.VIEW_DELIVERY_LOCATION,
    },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryLocationRoutingModule {}
