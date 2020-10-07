import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { environment } from "@environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { BaseComponent } from "./components/base/base.component";
import { httpInterceptorProviders } from "./interceptors";
import { AuthService } from "./services/auth/auth.service";
import { AuthEffects, PermissionEffects, UserEffects } from "./store/effects";
import { coreReducers } from "./store/state/core.state";

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature("core", coreReducers),
    EffectsModule.forFeature([AuthEffects, UserEffects, PermissionEffects]),
  ],
  providers: [
    AuthService,
    httpInterceptorProviders,
    { provide: "BASE_API_URL", useValue: environment.apiUrl },
  ],
})
export class CoreModule {}
