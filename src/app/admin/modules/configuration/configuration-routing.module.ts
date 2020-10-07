import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfigurationFormContainerComponent } from "./containers";

const routes: Routes = [
  {
    path: "",
    component: ConfigurationFormContainerComponent,
    // resolve: {
    //   configurations: ConfigurationResolver,
    // },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
