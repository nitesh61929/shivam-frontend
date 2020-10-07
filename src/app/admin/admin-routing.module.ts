import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminContainerComponent } from "./containers/admin-container.component";

const routes: Routes = [
  {
    path: "",
    component: AdminContainerComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./modules/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./modules/products/products.module").then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./modules/profile/profile.module").then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: "delivery-location",
        loadChildren: () =>
          import("./modules/delivery-location/delivery-location.module").then(
            (m) => m.DeliveryLocationModule
          ),
      },
      {
        path: "announcement",
        loadChildren: () =>
          import("./modules/announcement/announcement.module").then(
            (m) => m.AnnouncementModule
          ),
      },
      {
        path: "taxation",
        loadChildren: () =>
          import("./modules/taxation/taxation.module").then(
            (m) => m.TaxationModule
          ),
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./modules/order/order.module").then((m) => m.OrderModule),
      },
      {
        path: "online-delivery-partners",
        loadChildren: () =>
          import(
            "./modules/online-delivery-partner/online-delivery-partner.module"
          ).then((m) => m.OnlineDeliveryPartnerModule),
      },
      {
        path: "consumers",
        loadChildren: () =>
          import("./modules/consumers/consumers.module").then(
            (m) => m.ConsumersModule
          ),
      },
      {
        path: "admin-users",
        loadChildren: () =>
          import("./modules/backend-operator/backend-operator.module").then(
            (m) => m.BackendOperatorModule
          ),
      },
      {
        path: "feedback",
        loadChildren: () =>
          import("./modules/feedback/feedback.module").then(
            (m) => m.FeedbackModule
          ),
      },
      {
        path: "documents",
        loadChildren: () =>
          import("./modules/documents/documents.module").then(
            (m) => m.DocumentsModule
          ),
      },
      {
        path: "contact",
        loadChildren: () =>
          import("./modules/contact/contact.module").then(
            (m) => m.ContactModule
          ),
      },
      {
        path: "configuration",
        loadChildren: () =>
          import("./modules/configuration/configuration.module").then(
            (m) => m.ConfigurationModule
          ),
      },
      {
        path: "payment",
        loadChildren: () =>
          import("./modules/payment/payment.module").then(
            (m) => m.PaymentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
