import { db } from "../db";

interface WeightLogData {
  date: Date;
  weight: number;
}

interface WeightListParams {
  order: "date" | "weight";
  limit: number;
}

export async function addWeight(weightLog: WeightLogData) {
  await db.weightlog.add(weightLog);
}

export async function getWeight(id: Date) {
  return await db.weightlog.get(id);
}

export async function getWeightList(WeightList: WeightListParams) {
  return await db.weightlog
    .orderBy(WeightList.order)
    .limit(WeightList.limit)
    .reverse()
    .toArray()
    .catch((e) => {
      console.error("Dexie error:", e);
      return [];
    });
}
