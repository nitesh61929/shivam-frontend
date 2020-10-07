import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "@shared/shared.module";
import {
  ProductDetailComponent,
  ProductFormComponent,
  ProductListComponent,
  ProductsComponent,
} from "./components";
import {
  ProductDetailContainerComponent,
  ProductFormContainerComponent,
  ProductListContainerComponent,
  ProductsContainerComponent,
} from "./containers";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsEffects, ProductsReducer } from "./store";

@NgModule({
  declarations: [
    ProductsContainerComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductFormContainerComponent,
    ProductListContainerComponent,
    ProductDetailContainerComponent,
    ProductDetailComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature("products", ProductsReducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class ProductsModule {}
