import dayjs from "dayjs";
import { db, IFoodLog, TMealType, Journal } from "../db";
import { updateJournal } from "./journalService";

export const addFoodLog = async (
  journal: Journal,
  foodLog: IFoodLog
): Promise<void> => {
  const logID = await db.foodlog.add(foodLog);
  journal.addFood(logID, foodLog);

  await updateJournal(journal);
};

export const getFoodLog = async (id: number): Promise<IFoodLog | undefined> =>
  await db.foodlog.get(id);

export const getFoodLogByMealType = async (mealType: TMealType, date: string) =>
  await db.foodlog
    .where({
      mealType: mealType,
      date: dayjs(date).format("YYYY-MM-DD"),
    })
    .toArray();
