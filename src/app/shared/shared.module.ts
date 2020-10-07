import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { environment } from "@environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { QuillModule } from "ngx-quill";
import { ActionsComponent } from "./actions/actions.component";
import { ConfirmDialogComponent, ConfirmDialogService } from "./confirm-dialog";
import { DateRangeComponent } from "./date-range/date-range.component";
import { DetailComponent } from "./detail/detail.component";
import { OnlyNumberDirective } from "./directives";
import { HasAccessDirective } from "./directives/has-access/has-access.directive";
import { PasswordDirective } from "./directives/password/password.directive";
import { DownloadComponent } from "./download/download.component";
import { ErrorMessageComponent } from "./error-message";
import { ErrorPageComponent, NoConnectionComponent } from "./error-page";
import { AccessDeniedComponent } from "./error-page/access-denied/access-denied.component";
import { NoPermissionComponent } from "./error-page/no-permission/no-permission.component";
import { NotFoundComponent } from "./error-page/not-found";
import { ServerErrorComponent } from "./error-page/server-error/server-error.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FormComponent } from "./form";
import { LoaderComponent } from "./loader";
import { MaterialModule } from "./material";
import { MaterialIconComponent } from "./material-icon";
import { NavbarComponent, NavbarContainerComponent } from "./navbar";
import { PageHeaderComponent } from "./page-header/components/page-header.component";
import { PaymentStatusComponent } from "./payment-status/payment-status.component";
import { PriceListComponent } from "./price/components";
import { PriceFormComponent } from "./price/components/price-form/price-form.component";
import { PriceFormContainerComponent } from "./price/containers/price-form";
import { PriceListContainerComponent } from "./price/containers/price-list";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { RatingComponent } from "./rating/rating.component";
import { ReadMoreComponent } from "./read-more/read-more.component";
import { SearchInputComponent } from "./search-input";
import { SelectCheckAllComponent } from "./select-check-all/select-check-all.component";
import { SidebarComponent, SidebarContainerComponent } from "./sidebar";
import { SharedReducers } from "./store";
import {
  DocumentsEffects,
  ErpDealersEffects,
  OnlineDeliveryPartnerEffects,
  PriceEffects,
  ProvincesWithDistrictsEffects,
} from "./store/effects";
import { ConfigurationEffects } from "./store/effects/configuration.effects";
import { DeliveryLocationEffects } from "./store/effects/delivery-location.effects";
import { PagesEffects } from "./store/effects/pages.effects";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";
import { ToggleComponent } from "./toggle/toggle.component";

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarContainerComponent,
    NavbarComponent,
    NavbarContainerComponent,
    ErrorMessageComponent,
    MaterialIconComponent,
    ConfirmDialogComponent,
    LoaderComponent,
    FormComponent,
    OnlyNumberDirective,
    ErrorPageComponent,
    SearchInputComponent,
    ActionsComponent,
    HasAccessDirective,
    PriceFormContainerComponent,
    PriceListComponent,
    PriceFormComponent,
    PriceListContainerComponent,
    DetailComponent,
    DownloadComponent,
    PageHeaderComponent,
    AccessDeniedComponent,
    SelectCheckAllComponent,
    ServerErrorComponent,
    NoConnectionComponent,
    ToggleComponent,
    DateRangeComponent,
    FileUploadComponent,
    NoPermissionComponent,
    ReadMoreComponent,
    PasswordDirective,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    PaymentStatusComponent,
    NotFoundComponent,
    RatingComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [ConfirmDialogService],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    PdfViewerModule,
    NgxChartsModule,
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: environment.quillToolbars,
      },
    }),
    StoreModule.forFeature("shared", SharedReducers),
    EffectsModule.forFeature([
      DeliveryLocationEffects,
      PriceEffects,
      ErpDealersEffects,
      OnlineDeliveryPartnerEffects,
      ProvincesWithDistrictsEffects,
      DocumentsEffects,
      ConfigurationEffects,
      PagesEffects,
    ]),
  ],
  exports: [
    QuillModule,
    MaterialModule,
    SidebarContainerComponent,
    NavbarContainerComponent,
    MaterialIconComponent,
    ErrorMessageComponent,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoaderComponent,
    FormComponent,
    OnlyNumberDirective,
    TranslateModule,
    SearchInputComponent,
    ActionsComponent,
    PriceFormContainerComponent,
    PriceListContainerComponent,
    DetailComponent,
    DownloadComponent,
    PageHeaderComponent,
    HasAccessDirective,
    AccessDeniedComponent,
    SelectCheckAllComponent,
    ToggleComponent,
    DateRangeComponent,
    FileUploadComponent,
    ReadMoreComponent,
    RouterModule,
    PasswordDirective,
    PdfViewerModule,
    RatingComponent,
    NgxChartsModule,
  ],
})
export class SharedModule {}
