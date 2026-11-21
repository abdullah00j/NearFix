import type { client } from "./amplify";

export type CreateProviderServiceInput = {
  providerId: string;
  category: string;
  price: number;
  description?: string;
  isActive?: boolean;
  pricingType?: "PER_TASK" | "PER_HOUR" | "PER_PRODUCT" | "PER_DAY" | null;
  ProductImages?: string[] | null;
};

export type UpdateServiceInput = {
  id: string;
  category?: string;
  price?: number;
  description?: string | null;
  isActive?: boolean | null;
  pricingType?: "PER_TASK" | "PER_HOUR" | "PER_PRODUCT" | "PER_DAY" | null;
  ProductImages?: string[] | null;
};

export type createProviderApplicationInput = Parameters<
  typeof client.mutations.createMyProviderApplication
>[0];

// type CreateProviderApplicationInput =
//   Parameters<
//     typeof client.mutations.createMyProviderApplication
//   >[0];

// Schema["ProviderService"]["createType"];
// Schema["ProviderService"]["updateType"];
// Schema["ProviderService"]["type"];
