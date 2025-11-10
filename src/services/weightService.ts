import { db } from "../db";
import { type IWeightLog } from "../db/models/weight";

interface WeightListParams {
  order: "date" | "weight";
  direction: "asc" | "desc";
  limit: number;
}

export const addWeight = async (weightLog: IWeightLog) =>
  await db.weightlog.add(weightLog);

export const getWeight = async (id: number) => await db.weightlog.get(id);

export const getWeightByDate = async (date: number) =>
  await db.weightlog.where({ date: date }).first();

export const getWeightList = async (params: WeightListParams) => {
  let collection = db.weightlog.orderBy(params.order).limit(params.limit);

  if (params.direction === "desc") collection.reverse();

  return collection.toArray().catch((e) => {
    console.error("Dexie error:", e);
    return [];
  });
};
