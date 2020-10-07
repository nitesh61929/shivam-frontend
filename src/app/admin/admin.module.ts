import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./components/admin.component";
import { AdminContainerComponent } from "./containers/admin-container.component";

@NgModule({
  declarations: [AdminContainerComponent, AdminComponent],
  imports: [SharedModule, AdminRoutingModule],
  exports: [],
})
export class AdminModule {}
