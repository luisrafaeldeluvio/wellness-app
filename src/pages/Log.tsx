import dayjs, { Dayjs } from "dayjs";
import CalendarHead from "../components/Calendar";
import LogFoodButton from "../components/LogFoodButton";
import MealGroup from "../components/MealGroup";
import { useEffect, useState } from "react";
import type { IFoodLog } from "../db/models/foodLog";
import FoodItem from "../components/FoodItem";
import { Journal } from "../db";
import { getJournalByDate } from "../services/journalService";
import { addFoodLog, getFoodLog } from "../services/foodLogService";

async function init() {
  // await newJournal(new Journal(dayjs().toISOString()));
  const x = await getJournalByDate(dayjs().format("YYYY-MM-DD"));
  if (x === undefined) return;
  await addFoodLog(x, {
    date: dayjs().format("YYYY-MM-DD"),
    mealType: "breakfast",
    name: "Egg",
    calorie: 120,
  });
}

// init();

const Log = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [data, setData] = useState<Journal | undefined>(undefined);
  const [foodLogs, setFoodLogs] = useState<IFoodLog[]>([]);

  useEffect(() => {
    (async () => {
      const x = await getJournalByDate(date.format("YYYY-MM-DD"));
      setFoodLogs([]);

      if (x) {
        const logs = await Promise.all(
          x.foodLogIDs.map((id) => getFoodLog(id)),
        );
        if (logs)
          setFoodLogs(logs.filter((log): log is IFoodLog => log !== undefined));
      }

      setData(x);
    })();
  }, [date]);

  return (
    <>
      <CalendarHead date={date} setDate={setDate}></CalendarHead>
      <MealGroup title="Breakfast" totalKcal={100}>
        {foodLogs.map((food) => {
          return <FoodItem data={food}></FoodItem>;
        })}
      </MealGroup>
      <LogFoodButton></LogFoodButton>
    </>
  );
};

export default Log;
