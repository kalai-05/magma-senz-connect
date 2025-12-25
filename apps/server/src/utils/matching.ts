import { DemandModel } from "../models/Demand.js";
import { MatchModel } from "../models/Match.js";
import { ProductModel } from "../models/Product.js";

const normalize = (value: string) => value.trim().toLowerCase();

const overlaps = (minA: number, maxA: number, minB: number, maxB: number) => {
  return Math.max(minA, minB) <= Math.min(maxA, maxB);
};

export const scoreMatch = (product: any, demand: any) => {
  let score = 0;
  if (normalize(product.category) === normalize(demand.category)) {
    score += 40;
  }
  if (normalize(product.location).includes(normalize(demand.location))) {
    score += 20;
  }
  if (demand.qty <= product.qty) {
    score += 20;
  }
  if (
    overlaps(
      product.priceMin,
      product.priceMax,
      demand.budgetMin,
      demand.budgetMax
    )
  ) {
    score += 20;
  }
  return score;
};

export const recomputeMatches = async () => {
  const products = await ProductModel.find({ status: "active" });
  const demands = await DemandModel.find({ status: "active" });
  for (const product of products) {
    for (const demand of demands) {
      const score = scoreMatch(product, demand);
      if (score >= 60) {
        await MatchModel.updateOne(
          { productId: product._id, demandId: demand._id },
          { $setOnInsert: { score, status: "pending" } },
          { upsert: true }
        );
      }
    }
  }
};

export const recomputeForProduct = async (productId: string) => {
  const product = await ProductModel.findById(productId);
  if (!product) return;
  const demands = await DemandModel.find({ status: "active" });
  for (const demand of demands) {
    const score = scoreMatch(product, demand);
    if (score >= 60) {
      await MatchModel.updateOne(
        { productId: product._id, demandId: demand._id },
        { $setOnInsert: { score, status: "pending" } },
        { upsert: true }
      );
    }
  }
};

export const recomputeForDemand = async (demandId: string) => {
  const demand = await DemandModel.findById(demandId);
  if (!demand) return;
  const products = await ProductModel.find({ status: "active" });
  for (const product of products) {
    const score = scoreMatch(product, demand);
    if (score >= 60) {
      await MatchModel.updateOne(
        { productId: product._id, demandId: demand._id },
        { $setOnInsert: { score, status: "pending" } },
        { upsert: true }
      );
    }
  }
};
