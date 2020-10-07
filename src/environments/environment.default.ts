export const defaultEnvironment = {
  defaultLanguage: "en",
  storage: localStorage,
  fileSizeValidations:
    // File size should be in Kb
    { pdf: 2048, jpg: 2048, jpeg: 2048, gif: 2048, png: 2048, mp4: 10240 },
  relatedPermissions: {
    list: [
      "view",
      "edit",
      "delete",
      "activate",
      "update_promotions",
      "update_payments",
      "allocate",
      "revoke",
      "cancel_orders",
    ],
    view: ["edit", "allocate", "revoke", "cancel_orders"],
    view_products: [
      "list_prices",
      "delete_prices",
      "edit_prices",
      "add_prices",
      "export_prices",
    ],
    add_prices: ["edit_prices"],
    list_products: ["add_prices", "list_prices", "export_prices"],
    list_prices: ["edit_prices", "delete_prices"],
    list_orders_online_delivery_partners: ["view_orders", "allocate"],
    list_products_delivery_location: [
      "add_prices",
      "edit_prices",
      "view_products",
    ],
  },
  // modules to be shown on text editor toolbar
  quillToolbars: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link"],
    ["clean"],
  ],
  pageSizeOptions: [5, 10, 15, 20, 25, 30],
};
