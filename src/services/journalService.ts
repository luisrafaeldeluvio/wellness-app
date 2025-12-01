import dayjs from "dayjs";
import { db, Journal } from "../db";

export const newJournal = async (journal: Journal) =>
  await db.journal.add(journal);

export const getJournalByDate = async (date: number) =>
  await db.journal.where({ date: dayjs(date).toISOString }).first();

export const updateJournal = async (journal: Journal) =>
  await db.journal.update(journal.id, journal);
