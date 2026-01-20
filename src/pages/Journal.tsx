import dayjs, { Dayjs } from "dayjs";
import CalendarHead from "../components/layout/Calendar";
import LogFoodButton from "../components/layout/LogFoodButton";
import { useEffect, useState } from "react";
import type { IFoodItem } from "../db/models/foodItem";
import FoodItem from "../components/layout/FoodItem";
import { Journal as JournalClass } from "../db";
import { addJournal, getJournalByDate } from "../services/journalService";
import { addFoodItem, getFoodItem } from "../services/foodItemService";
import JournalSummary from "../components/layout/JournalSummary";
import Header from "../components/ui/Header";

async function init() {
  // await newJournal(new Journal(dayjs().toISOString()));
  const x = await getJournalByDate(dayjs().toString());
  if (x === undefined) {
    const journal = new JournalClass(dayjs().toString());
    addJournal(journal);
  }
  await addFoodItem(x as JournalClass, {
    date: dayjs().format("YYYY-MM-DD"),

    name: "Egg",
    energy: 120,
  }).then(() => {
    addFoodItem(x as JournalClass, {
      date: dayjs().format("YYYY-MM-DD"),

      name: "Rice",
      energy: 200,
    });
  });
}

// init();

const Journal = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [foodItems, setFoodItems] = useState<IFoodItem[]>([]);
  const [journal, setJournal] = useState<JournalClass>(
    new JournalClass(date.toString()),
  );

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      const journalData = await getJournalByDate(date.toString());
      setFoodItems([]);
      setJournal(new JournalClass(date.toString()));

      if (!journalData) return;
      setJournal(journalData);

      const foods = await Promise.all(
        journalData.foodItemIDs.map((id) => getFoodItem(id)),
      );
      if (foods) {
        setFoodItems(
          foods.filter((food): food is IFoodItem => food !== undefined),
        );
      }
    })();

    return () => {
      ignore = true;
    };
  }, [date]);

  return (
    <>
      <Header>Journal</Header>
      <CalendarHead date={date} setDate={setDate}></CalendarHead>

      <div className="overflow-y-auto">
        <JournalSummary data={journal}></JournalSummary>

        <ul className="">
          {foodItems.map((food) => (
            <FoodItem data={food}></FoodItem>
          ))}
        </ul>
      </div>

      <LogFoodButton></LogFoodButton>
    </>
  );
};

export default Journal;
