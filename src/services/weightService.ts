import { db } from "../db";

interface WeightLogData {
  date: number;
  weight: number;
}

interface WeightListParams {
  order: "date" | "weight";
  direction: "asc" | "desc";
  limit: number;
}

export const addWeight = async (weightLog: WeightLogData) =>
  await db.weightlog.add(weightLog);

export const getWeight = async (id: number) => await db.weightlog.get(id);

export const getWeightByDate = async (date: number) =>
  await db.weightlog.where("date").equals(date).toArray();

export const getWeightList = async (params: WeightListParams) => {
  let collection = db.weightlog.orderBy(params.order).limit(params.limit);

  if (params.direction === "desc") collection.reverse();

  return collection.toArray().catch((e) => {
    console.error("Dexie error:", e);
    return [];
  });
};
