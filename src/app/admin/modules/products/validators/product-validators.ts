import { FormGroup } from "@angular/forms";

export function CompareQuantity() {
  return (fg: FormGroup) => {
    const minQuantity = fg.get("min_order_quantity").value;
    const maxQuantity = fg.get("max_order_quantity").value;

    if (minQuantity && maxQuantity) {
      if (minQuantity > maxQuantity) {
        return {
          quantityCompare: {
            valid: false,
          },
        };
      }
    }

    return null;
  };
}
