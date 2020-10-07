import { Injectable } from "@angular/core";
import { AppPermissions, AppRoutes } from "@core/enums";
import { IMenuItem } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  menuLists: IMenuItem[] = [
    {
      iconName: "DASHBOARD",
      menuName: "Dashboard",
      redirectTo: AppRoutes.DASHBOARD_PAGE,
      has_access_module: "*",
    },
    {
      iconName: "ORDER",
      menuName: "Orders",
      redirectTo: AppRoutes.ORDERS_PAGE,
      has_access_module: AppPermissions.ORDER,
    },
    {
      iconName: "DELIVERY_LOCATION",
      menuName: "Delivery Location",
      redirectTo: AppRoutes.DELIVERY_LOCATION_PAGE,
      has_access_module: AppPermissions.DELIVERY_LOCATION_MODULE,
    },
    {
      iconName: "PRODUCTS",
      menuName: "Products",
      redirectTo: AppRoutes.PRODUCTS_PAGE,
      has_access_module: AppPermissions.PRODUCTS_MODULE,
    },
    {
      iconName: "TAXATION",
      menuName: "Taxation",
      redirectTo: AppRoutes.TAXATION_PAGE,
      has_access_module: AppPermissions.TAXATION_MODULE,
    },
    {
      iconName: "FEEDBACK",
      menuName: "Feedback",
      redirectTo: AppRoutes.FEEDBACK_PAGE,
      has_access_module: AppPermissions.FEEDBACK_MODULE,
    },
    {
      iconName: "ANNOUNCEMENT",
      menuName: "Announcement",
      redirectTo: AppRoutes.ANNOUNCEMENT_PAGE,
      has_access_module: AppPermissions.ANNOUNCEMENT_MODULE,
    },
    {
      iconName: "DEALER",
      menuName: "Online Delivery Partners",
      redirectTo: AppRoutes.ONLINE_DELIVERY_PARTNERS_PAGE,
      has_access_module: AppPermissions.DEALER_MODULE,
    },
    {
      iconName: "CONSUMERS",
      menuName: "Consumers",
      redirectTo: AppRoutes.CONSUMERS_PAGE,
      has_access_module: AppPermissions.CONSUMER_MODULE,
    },
    {
      iconName: "BACKEND_OPERATOR",
      menuName: "Admin Users",
      redirectTo: AppRoutes.BACKEND_OPERATOR_PAGE,
      has_access_module: AppPermissions.BACKEND_OPERATOR_MODULE,
    },

    {
      iconName: "CONFIGURATIONS",
      menuName: "Configuration",
      redirectTo: AppRoutes.CONFIGURATIONS_PAGE,
      has_access_module: AppPermissions.CONFIGURATION_MODULE,
    },
    {
      iconName: "PAYMENTS",
      menuName: "Payment",
      redirectTo: AppRoutes.PAYMENT_CONFIGURATION,
      has_access_module: AppPermissions.PAYMENT_MODULE,
    },
    {
      iconName: "CONTACT",
      menuName: "Contact",
      redirectTo: AppRoutes.CONTACT_PAGE,
      has_access_module: AppPermissions.CONTACT,
    },
    {
      iconName: "DOCUMENTS",
      menuName: "User Agreements",
      redirectTo: AppRoutes.DOCUMENTS_PAGE,
      has_access_module: AppPermissions.DOCUMENTS_MODULE,
    },
  ];
  constructor() {}
}
