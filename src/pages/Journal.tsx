import dayjs, { Dayjs } from "dayjs";
import CalendarHead from "../components/layout/Calendar";
import LogFoodButton from "../components/layout/LogFoodButton";
import { useEffect, useState } from "react";
import type { IFoodItem } from "../db/models/foodItem";
import FoodItem from "../components/layout/FoodItem";
import { type IJournal } from "../db";
import { getJournalByDate } from "../services/journalService";
import { getFoodItem } from "../services/foodItemService";
import JournalSummary from "../components/layout/JournalSummary";
import Header from "../components/ui/Header";
import { useLiveQuery } from "dexie-react-hooks";

const Journal = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [journal, setJournal] = useState<IJournal>({
    date: date.toString(),
    foodItemIDs: [],
    totalEnergy: {
      intake: 0,
      outflow: 0,
    },
  });
  const foodItems = useLiveQuery(async () => {
    const journalData = await getJournalByDate(date.toString());
    if (!journalData) return [];

    const foods = await Promise.all(
      journalData.foodItemIDs.map((id) => getFoodItem(id)),
    );

    if (foods)
      return foods.filter((food): food is IFoodItem => food !== undefined);
  }, [date]);

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      const journalData = await getJournalByDate(date.toString());

      if (!journalData) return;
      setJournal(journalData);
    })();

    return () => {
      ignore = true;
    };
  }, [date]);

  if (!journal) {
    console.error("There was no journal found: " + journal);
    return;
  }

  return (
    <>
      <Header>Journal</Header>
      <CalendarHead date={date} setDate={setDate}></CalendarHead>

      <div>
        <JournalSummary data={journal}></JournalSummary>

        <ul className="list-none">
          {foodItems?.map((food) => (
            <FoodItem data={food}></FoodItem>
          ))}
        </ul>
      </div>

      <LogFoodButton></LogFoodButton>
    </>
  );
};

export default Journal;
