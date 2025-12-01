import dayjs from "dayjs";
import { db, IWeightLog } from "../db";

interface WeightListParams {
  order: "date" | "weight";
  direction: "asc" | "desc";
  limit: number;
}

export const addWeight = async (weightLog: IWeightLog) =>
  await db.weightlog.add(weightLog);

export const getWeight = async (id: number) => await db.weightlog.get(id);

export const getWeightByDate = async (date: string) =>
  await db.weightlog.where({ date: dayjs(date).toISOString }).first();

export const getWeightList = async (params: WeightListParams) => {
  let collection = db.weightlog.orderBy(params.order).limit(params.limit);

  if (params.direction === "desc") collection.reverse();

  return collection.toArray().catch((e) => {
    console.error("Dexie error:", e);
    return [];
  });
};
