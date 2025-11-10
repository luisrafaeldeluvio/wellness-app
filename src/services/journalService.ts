import { db } from "../db";
import { Journal } from "../db/models/journal";

export const newJournal = async (journal: Journal) =>
  await db.journal.add(journal);

export const getJournalByDate = async (date: number) =>
  await db.journal.where({ date: date }).first();

export const updateJournal = async (journal: Journal) =>
  await db.journal.update(journal.id, {
    id: journal.id,
    date: journal.date,
    foodLogIDs: journal.foodLogIDs,
    totalCalories: journal.totalCalories,
  });
