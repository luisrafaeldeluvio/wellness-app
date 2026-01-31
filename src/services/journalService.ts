import dayjs from "dayjs";
import { db, type FoodItem, type IJournal } from "../db";

/**
 * Adds a journal entry to the DB.
 * @param journal the journal class that will be added to the DB.
 * @example
 * const journal = new Journal(day.js().format("YYYY-MM-DD"));
 * await addJournal(journal);
 */
export const addJournal = async (journal: IJournal) =>
  await db.journal.add(journal);

export const getJournalByDate = async (date: string) =>
  await db.journal.where({ date: dayjs(date).format("YYYY-MM-DD") }).first();

export const updateJournal = async (journal: IJournal) => {
  if (!journal.id) return;
  await db.journal.update(journal.id, {
    id: journal.id,
    date: journal.date,
    foodItemIDs: journal.foodItemIDs,
    totalEnergy: journal.totalEnergy,
  });
};

export const addFoodToJournal = (journal: IJournal, foodItem: FoodItem) => {
  if (!foodItem.id) return;

  journal.foodItemIDs.push(foodItem.id);

  const energy = foodItem.energy;
  if (energy < 0) {
    journal.totalEnergy.outflow += energy;
  } else {
    journal.totalEnergy.intake += energy;
  }

  return updateJournal(journal);
};
