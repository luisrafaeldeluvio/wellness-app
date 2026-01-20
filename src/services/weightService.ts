import dayjs from "dayjs";
import { db, UserInfo, type IWeightLog } from "../db";
import { getUser, updateUser } from "./userService";

interface WeightListParams {
  order: "date" | "weight";
  direction: "asc" | "desc";
  limit: number;
}

export const addWeight = async (weightLog: IWeightLog) => {
  const User = await getUser();
  if (!User) return;
  const user = new UserInfo(User);
  user.weight = weightLog.weight;
  updateUser(user);

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
