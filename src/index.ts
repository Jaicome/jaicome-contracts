import { aiContract } from "./contracts/ai";
import { payoutContract } from "./contracts/payout";
import { catalogContract } from "./contracts/catalog";

export * from "./contracts/ai";
export * from "./contracts/payout";

export const contract = {
  ai: aiContract,
  payout: payoutContract,
  catalog: catalogContract,
};
