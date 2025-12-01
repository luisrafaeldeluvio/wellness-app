import dayjs from "dayjs";
import { db, Journal } from "../db";

/**
 * Adds a journal entry to the DB.
 * @param journal the journal class that will be added to the DB.
 * @example
 * const journal = new Journal(day.js().format("YYYY-MM-DD"));
 * await addJournal(journal);
 */
export const addJournal = async (journal: Journal) =>
  await db.journal.add(journal);

export const getJournalByDate = async (date: string) =>
  await db.journal.where({ date: dayjs(date).format("YYYY-MM-DD") }).first();

export const updateJournal = async (journal: Journal) =>
  await db.journal.update(journal.id, {
    id: journal.id,
    date: journal.date,
    foodItemIDs: journal.foodItemIDs,
    totalEnergy: journal.totalEnergy,
  });
