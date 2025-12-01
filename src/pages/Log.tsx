import dayjs from "dayjs";
import CalendarHead from "../components/Calendar";
import LogFoodButton from "../components/LogFoodButton";
import MealGroup from "../components/MealGroup";
import { useState } from "react";
import type { IFoodLog } from "../db/models/foodLog";
import FoodItem from "../components/FoodItem";

const foodsample: IFoodLog = {
  id: 123,
  date: 456,
  time: 789,
  mealType: "breakfast",
  name: "RIce",
  calorie: 500,
};

const Log = () => {
  const [date, setDate] = useState(dayjs());
  return (
    <>
      <CalendarHead date={date} setDate={setDate}></CalendarHead>
      <MealGroup title="Breakfast" totalKcal={100}>
        <FoodItem data={foodsample}></FoodItem>
        <FoodItem data={foodsample}></FoodItem>
        <FoodItem data={foodsample}></FoodItem>
      </MealGroup>
      <LogFoodButton></LogFoodButton>
    </>
  );
};

export default Log;
