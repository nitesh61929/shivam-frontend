import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPermissions } from "@core/enums";
import { PermissionGuard } from "@core/guards/permission/permission.guard";
import { DeliveryLocationResolver } from "@shared/route-resolvers";
import {
  ProductDetailContainerComponent,
  ProductFormContainerComponent,
  ProductsContainerComponent,
} from "./containers";
import { ProductDetailResolver } from "./route-resolvers/product-detail.resolver";

const routes: Routes = [
  {
    path: "",
    component: ProductsContainerComponent,
  },
  {
    path: "create",
    component: ProductFormContainerComponent,
    data: {
      hasAccess: AppPermissions.ADD_PRODUCT,
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "edit/:id",
    component: ProductFormContainerComponent,
    data: {
      hasAccess: AppPermissions.EDIT_PRODUCT,
    },
    canActivate: [PermissionGuard],
  },
  {
    path: "detail/:id",
    component: ProductDetailContainerComponent,
    resolve: {
      deliveryLocationList: DeliveryLocationResolver,
      productDetail: ProductDetailResolver,
    },
    data: { path: "detail/:id", hasAccess: AppPermissions.VIEW_PRODUCT },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
