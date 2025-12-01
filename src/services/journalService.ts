import dayjs from "dayjs";
import { db, Journal } from "../db";

export const newJournal = async (journal: Journal) =>
  await db.journal.add(journal);

export const getJournalByDate = async (date: string) =>
  await db.journal.where({ date: dayjs(date).format("YYYY-MM-DD") }).first();

export const updateJournal = async (journal: Journal) =>
  await db.journal.update(journal.id, {
    id: journal.id,
    date: journal.date,
    foodLogIDs: journal.foodLogIDs,
    totalCalories: journal.totalCalories,
  });
