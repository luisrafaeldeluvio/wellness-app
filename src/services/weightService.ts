import dayjs from "dayjs";
import { db, type IWeightLog } from "../db";
import { getUser, updateUser } from "./userService";

interface WeightListParams {
  order: "date" | "weight";
  direction: "asc" | "desc";
  limit: number;
}

export const addWeight = async (weightLog: IWeightLog) => {
  const user = await getUser();
  if (!user) return;

  user.weight = weightLog.weight;
  await updateUser(user);

  await db.weightlog.add(weightLog);
};

export const getWeight = async (id?: number) => {
  if (!id) return await db.weightlog.toCollection().last();
  else return await db.weightlog.get(id);
};

export const getWeightByDate = async (date: string) =>
  await db.weightlog.where({ date: dayjs(date).format("YYYY-MM-DD") }).first();

export const getWeightList = async (params: WeightListParams) => {
  let collection = db.weightlog.orderBy(params.order).limit(params.limit);

  if (params.direction === "desc") collection.reverse();

  return collection.toArray().catch((e) => {
    console.error("Dexie error:", e);
    return [];
  });
};
