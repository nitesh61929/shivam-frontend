import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileResolver } from "@core/route-resolvers";
import {
  ProfileContainerComponent,
  ProfileFormContainerComponent,
  UpdatePasswordContainerComponent,
} from "./containers";

const routes: Routes = [
  {
    path: "",
    resolve: {
      profile: ProfileResolver,
    },
    component: ProfileContainerComponent,
  },
  {
    path: "edit/:id",
    resolve: {
      profile: ProfileResolver,
    },
    component: ProfileFormContainerComponent,
  },
  {
    path: "update-password",
    component: UpdatePasswordContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
