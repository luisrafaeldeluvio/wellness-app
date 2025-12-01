import dayjs, { Dayjs } from "dayjs";
import CalendarHead from "../components/Calendar";
import LogFoodButton from "../components/LogFoodButton";
import MealGroup from "../components/MealGroup";
import { useEffect, useState } from "react";
import type { IFoodItem } from "../db/models/foodItem";
import FoodItem from "../components/FoodItem";
import { Journal as JournalClass } from "../db";
import { getJournalByDate } from "../services/journalService";
import { addFoodItem, getFoodItem } from "../services/foodItemService";

async function init() {
  // await newJournal(new Journal(dayjs().toISOString()));
  const x = await getJournalByDate(dayjs().format("YYYY-MM-DD"));
  if (x === undefined) return;
  await addFoodItem(x, {
    date: dayjs().format("YYYY-MM-DD"),
    mealType: "breakfast",
    name: "Egg",
    energy: 120,
  });
}

// init();

const Journal = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [data, setData] = useState<JournalClass | undefined>(undefined);
  const [foodItems, setFoodItems] = useState<IFoodItem[]>([]);

  useEffect(() => {
    (async () => {
      const journal = await getJournalByDate(date.format("YYYY-MM-DD"));
      setFoodItems([]);

      if (!journal) return;

      const items = await Promise.all(
        journal.foodItemIDs.map((id) => getFoodItem(id)),
      );
      if (items)
        setFoodItems(
          items.filter(
            (journal): journal is IFoodItem => journal !== undefined,
          ),
        );

      setData(journal);
    })();
  }, [date]);

  return (
    <>
      <CalendarHead date={date} setDate={setDate}></CalendarHead>
      <MealGroup title="Breakfast" totalKcal={100}>
        {foodItems.map((food) => {
          return <FoodItem data={food}></FoodItem>;
        })}
      </MealGroup>
      <LogFoodButton></LogFoodButton>
    </>
  );
};

export default Journal;
