import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPermissions } from "@core/enums";
import { PermissionGuard } from "@core/guards/permission/permission.guard";
import { ProvincesWithDistrictsResolver } from "@shared/route-resolvers";
import {
  ConsumerFormContainerComponent,
  ConsumersContainerComponent,
} from "./containers";
import { ConsumerDetailContainerComponent } from "./containers/consumer-detail";

const routes: Routes = [
  {
    path: "",
    component: ConsumersContainerComponent,
  },
  {
    path: "edit/:id",
    component: ConsumerFormContainerComponent,
    resolve: {
      provincesWithDistricts: ProvincesWithDistrictsResolver,
    },
    data: {
      hasAccess: AppPermissions.EDIT_CONSUMER,
    },
    canActivate: [PermissionGuard],
  },

  {
    path: "detail/:id",
    component: ConsumerDetailContainerComponent,
    data: {
      hasAccess: AppPermissions.VIEW_CONSUMER,
    },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumersRoutingModule {}
