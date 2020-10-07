import { FormGroup } from "@angular/forms";

export function CompareFOC() {
  return (fg: FormGroup) => {
    const foc = fg.get("foc").value;
    const focEligibleCount = fg.get("foc_eligible_count").value;

    if (foc && focEligibleCount) {
      if (foc > focEligibleCount) {
        return {
          focCompare: {
            valid: false,
          },
        };
      }
    }

    return null;
  };
}

export function ComparePriceDiscount() {
  return (fg: FormGroup) => {
    const price = fg.get("price").value;
    const discount = fg.get("discount_amount").value;

    if (price && discount) {
      if (discount > price) {
        return {
          priceDiscountCompare: {
            valid: false,
          },
        };
      }
    }

    return null;
  };
}
