import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentContainerComponent } from "./containers";

const routes: Routes = [
  {
    path: "",
    component: PaymentContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
