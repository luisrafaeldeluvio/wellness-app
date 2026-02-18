import { useEffect, useState } from "react";
import FoodInfo from "../../components/layout/FoodInfo";
import { PageHeader } from "../../components/ui/Header";
import { getFoodItem } from "../../services/foodItemService";
import type { FoodItem, JournalFoodItem } from "../../db";
import { getFoodBarCodeResult } from "../../services/openFoodFacts";
import { useParams } from "wouter";

const ItemInfo = ({ food }: { food: JournalFoodItem | FoodItem }) => {
  const processedFood = Object.fromEntries(
    Object.entries({ ...food, ...food.nutriments }).map(([k, v]) => [
      k,
      String(v),
    ]),
  );
  return (
    <>
      <div className="m-4">
        <FoodInfo
          defaultValue={{
            ...processedFood,
          }}
          disabledInputs={true}
          hiddenInputs={["date", "consumed_g"]}
        ></FoodInfo>
      </div>
    </>
  );
};

export const JournalItemInfo = () => {
  const { id } = useParams();
  const [food, setFood] = useState<JournalFoodItem>();

  useEffect(() => {
    (async () => {
      setFood(await getFoodItem(Number(id)));
    })();
  }, []);

  if (!food)
    return (
      <>
        <PageHeader headerText={"Back"} location={`~/journal/`} />
        <p>The food was not found on the journal.</p>
      </>
    );

  return (
    <>
      <PageHeader headerText={food.name} location={`~/journal/${food.date}`} />
      <ItemInfo food={food} />
    </>
  );
};

export const FoodItemInfo = () => {
  const { code } = useParams();
  const [food, setFood] = useState<FoodItem>();

  useEffect(() => {
    (async () => {
      if (code) setFood(await getFoodBarCodeResult(code));
    })();
  }, []);

  if (!food)
    return (
      <>
        <PageHeader headerText={"Back"} />
        <p>The food was not found on the journal.</p>
      </>
    );

  return (
    <>
      <PageHeader headerText={food.name} />
      <ItemInfo food={food} />
    </>
  );
};
