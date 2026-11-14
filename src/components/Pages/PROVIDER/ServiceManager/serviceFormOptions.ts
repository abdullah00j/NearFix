export const serviceCategories = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Carpentry",
  "Painting",
  "Appliance repair",
  "HVAC",
  "Handyman",
  "Landscaping",
] as const;

export const pricingUnits = [
  { value: "hour", label: "Per hour", pricingType: "PER_HOUR" },
  { value: "product", label: "Per product", pricingType: "PER_PRODUCT" },
  { value: "work", label: "Per job", pricingType: "PER_TASK" },
  { value: "day", label: "Per day", pricingType: "PER_DAY" },
] as const;

export type PricingUnit = (typeof pricingUnits)[number]["value"];
export type PricingType = (typeof pricingUnits)[number]["pricingType"];

const pricingTypeByUnit: Record<PricingUnit, PricingType> = {
  hour: "PER_HOUR",
  product: "PER_PRODUCT",
  work: "PER_TASK",
  day: "PER_DAY",
};

export function pricingTypeForUnit(unit: PricingUnit): PricingType {
  return pricingTypeByUnit[unit];
}

export function pricingUnitForType(
  pricingType?: PricingType | null,
): PricingUnit {
  return (
    pricingUnits.find((option) => option.pricingType === pricingType)?.value ??
    "work"
  );
}
