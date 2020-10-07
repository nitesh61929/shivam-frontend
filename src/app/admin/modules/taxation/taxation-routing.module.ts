import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPermissions } from "@core/enums";
import { PermissionGuard } from "@core/guards/permission/permission.guard";
import { TaxationContainerComponent } from "./containers";
import { TaxationFormContainerComponent } from "./containers/taxation-form";

const routes: Routes = [
  {
    path: "",
    component: TaxationContainerComponent,
  },
  {
    path: "edit/:id",
    component: TaxationFormContainerComponent,
    data: {
      hasAccess: AppPermissions.EDIT_TAXATION,
    },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxationRoutingModule {}
