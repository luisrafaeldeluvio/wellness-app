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

export async function addWeight(weightLog: WeightLogData) {
  await db.weightlog.add(weightLog);
}

export async function getWeight(id: number) {
  return await db.weightlog.get(id);
}

export async function getWeightByDate(date: number) {
  return await db.weightlog.where("date").equals(date).toArray();
}

export async function getWeightList(params: WeightListParams) {
  let collection = db.weightlog.orderBy(params.order).limit(params.limit);
  if (params.direction === "desc") collection.reverse();
  return collection.toArray().catch((e) => {
    console.error("Dexie error:", e);
    return [];
  });
}
