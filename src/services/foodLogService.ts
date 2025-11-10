import { db } from "../db";
import { type IFoodLog, type TMealType } from "../db/models/foodLog";
import { Journal } from "../db/models/journal";
import { updateJournal } from "./journalService";

export const addFoodLog = async (
  journal: Journal,
  foodLog: IFoodLog,
): Promise<void> => {
  const logID = await db.foodlog.add(foodLog);
  journal.addFood(logID, foodLog);

  await updateJournal(journal);
};

export const getFoodLog = async (id: number): Promise<IFoodLog | undefined> =>
  await db.foodlog.get(id);

export const getFoodLogByTime = async (time: number) =>
  await db.foodlog.where({ time: time }).first();

export const getFoodLogByMealType = async (mealType: TMealType, date: number) =>
  await db.foodlog.where({ mealType: mealType, date: date }).first();
