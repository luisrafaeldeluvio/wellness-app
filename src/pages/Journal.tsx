import dayjs, { Dayjs } from "dayjs";
import CalendarHead from "../components/layout/Calendar";
import LogFoodButton from "../components/layout/LogFoodButton";
import type { IFoodItem } from "../db/models/foodItem";
import FoodItem from "../components/layout/FoodItem";
import { type IJournal } from "../db";
import { getJournalByDate } from "../services/journalService";
import { bulkGetFoodItem, getFoodItem } from "../services/foodItemService";
import JournalSummary from "../components/layout/JournalSummary";
import Header from "../components/ui/Header";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "wouter";

interface DateParams {
  date: string;
}

const Journal = () => {
  const dateParams = useParams<DateParams>();
  const date: Dayjs = dayjs(dateParams.date);

  const emptyJournal: IJournal = {
    date: date.toString(),
    foodItemIDs: [],
    totalEnergy: {
      intake: 0,
      outflow: 0,
    },
  };

  const { journal, foodItems } = useLiveQuery(async () => {
    const journalData = await getJournalByDate(date.toString());
    if (!journalData) return;

    const foods = await bulkGetFoodItem(journalData.foodItemIDs);

    if (foods)
      return {
        journal: journalData,
        foodItems: foods.filter(
          (food): food is IFoodItem => food !== undefined,
        ),
      };

    return;
  }, [date]) ?? {
    journal: emptyJournal,
    foodItems: [],
  };

  return (
    <>
      <Header>Journal</Header>
      <CalendarHead date={date}></CalendarHead>

      <div>
        <JournalSummary data={journal}></JournalSummary>

        <ul className="list-none">
          {foodItems?.map((food) => (
            <FoodItem data={food}></FoodItem>
          ))}
        </ul>
      </div>

      <LogFoodButton date={date}></LogFoodButton>
    </>
  );
};

export default Journal;
