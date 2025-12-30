import dayjs, { Dayjs } from "dayjs";
import CalendarHead from "../components/Calendar";
import LogFoodButton from "../components/LogFoodButton";
import { useEffect, useState } from "react";
import type { IFoodItem } from "../db/models/foodItem";
import FoodItem from "../components/FoodItem";
import { Journal as JournalClass } from "../db";
import { addJournal, getJournalByDate } from "../services/journalService";
import { addFoodItem, getFoodItem } from "../services/foodItemService";

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

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      const journal = await getJournalByDate(date.toString());
      setFoodItems([]);
      if (!journal) return;

      const foods = await Promise.all(
        journal.foodItemIDs.map((id) => getFoodItem(id)),
      );

      if (foods)
        setFoodItems(
          foods.filter((food): food is IFoodItem => food !== undefined),
        );
    })();

    return () => {
      ignore = true;
    };
  }, [date]);

  return (
    <>
      <CalendarHead date={date} setDate={setDate}></CalendarHead>
      <ul>
        {foodItems.map((food) => (
          <li>
            <FoodItem data={food}></FoodItem>
          </li>
        ))}
      </ul>

      <LogFoodButton></LogFoodButton>
    </>
  );
};

export default Journal;
