import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPermissions } from "@core/enums";
import { PermissionGuard } from "@core/guards/permission/permission.guard";
import {
  AnnouncementContainerComponent,
  AnnouncementDetailContainerComponent,
  AnnouncementFormContainerComponent,
} from "./containers";
import { AnnouncementDetailResolver } from "./route-resolvers";

const routes: Routes = [
  {
    path: "",
    component: AnnouncementContainerComponent,
  },
  {
    path: "create",
    component: AnnouncementFormContainerComponent,
    data: {
      hasAccess: AppPermissions.ADD_ANNOUNCEMENT,
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "edit/:id",
    component: AnnouncementFormContainerComponent,
    data: {
      hasAccess: AppPermissions.EDIT_ANNOUNCEMENT,
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "detail/:id",
    component: AnnouncementDetailContainerComponent,
    resolve: {
      announcementDetail: AnnouncementDetailResolver,
    },
    data: { path: "detail/:id", hasAccess: AppPermissions.VIEW_ANNOUNCEMENT },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementRoutingModule {}
