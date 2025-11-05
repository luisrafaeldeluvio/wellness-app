import { db } from "../db";
import { IFoodLog, TMealType } from "../db/models/foodLog";

export const addFoodLog = async (foodLog: IFoodLog) =>
  await db.foodlog.add(foodLog);

export const getFoodLog = async (id: number) => await db.foodlog.get(id);

export const getFoodLogByTime = async (time: number) =>
  await db.foodlog.where({ time: time }).toArray();

export const getFoodLogByMealType = async (mealType: TMealType, date: number) =>
  await db.foodlog.where({ mealType: mealType, date: date }).toArray();
