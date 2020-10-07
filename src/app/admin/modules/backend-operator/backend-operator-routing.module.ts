import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPermissions } from "@core/enums";
import { PermissionGuard } from "@core/guards/permission/permission.guard";
import { PermissionResolver } from "@core/route-resolvers";
import {
  BackendOperatorContainerComponent,
  BackendOperatorDetailContainerComponent,
  BackendOperatorFormContainerComponent,
} from "./containers";
import { BackendOperatorDetailResolver } from "./route-resolvers";

const routes: Routes = [
  {
    path: "",
    component: BackendOperatorContainerComponent,
  },
  {
    path: "create",
    component: BackendOperatorFormContainerComponent,
    resolve: {
      permissions: PermissionResolver,
    },
    data: {
      hasAccess: AppPermissions.ADD_BACKEND_OPERATOR,
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "edit/:id",
    component: BackendOperatorFormContainerComponent,
    resolve: {
      backendOperatorDetail: BackendOperatorDetailResolver,
      permissions: PermissionResolver,
    },
    data: {
      hasAccess: AppPermissions.EDIT_BACKEND_OPERATOR,
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "detail/:id",
    component: BackendOperatorDetailContainerComponent,
    resolve: {
      backendOperatorDetail: BackendOperatorDetailResolver,
    },
    data: {
      hasAccess: AppPermissions.VIEW_BACKEND_OPERATOR,
    },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackendOperatorRoutingModule {}
