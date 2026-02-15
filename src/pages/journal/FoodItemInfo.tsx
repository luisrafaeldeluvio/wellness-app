import { useEffect, useState } from "react";
import FoodInfo from "../../components/layout/FoodInfo";

import { PageHeader } from "../../components/ui/Header";
import { getFoodItem } from "../../services/foodItemService";
import type { FoodItem, JournalFoodItem } from "../../db";
import { getFoodBarCodeResult } from "../../services/openFoodFacts";
import { useParams } from "wouter";

const FoodItemInfo = () => {
  const { type, id } = useParams();
  const [food, setFood] = useState<JournalFoodItem | FoodItem>();

  useEffect(() => {
    (async () => {
      if (type === "id" && id) {
        setFood(await getFoodItem(Number(id)));
      } else if (type === "code" && id) {
        setFood(await getFoodBarCodeResult(id));
      }
    })();
  }, []);

  //this already works, just need to work on if the food's type
  // is FoodItem (don't have any date)
  return food ? (
    <>
      <PageHeader headerText={food.name} location={`~/journal/${food.date}`} />

      <div className="m-4">
        <FoodInfo
          defaultValue={{
            date: food.date,
            name: food.name,
            serving_size: food.serving_size,
            consumed_g: String(food.consumed_g),
            "energy-kcal_100g": String(food.nutriments["energy-kcal_100g"]),
            proteins_100g: String(food.nutriments.proteins_100g),
            carbohydrates_100g: String(food.nutriments.carbohydrates_100g),
            sugars_100g: String(food.nutriments.sugars_100g),
            fat_100g: String(food.nutriments.fat_100g),
            "saturated-fat_100g": String(food.nutriments["saturated-fat_100g"]),
            fiber_100g: String(food.nutriments.fiber_100g),
            sodium_100g: String(food.nutriments.sodium_100g),
          }}
          disabledInputs={true}
        ></FoodInfo>
      </div>
    </>
  ) : (
    <>
      <PageHeader headerText={"Back"} location={`~/journal/`} />
      <p>The food was not found</p>
    </>
  );
};

export default FoodItemInfo;
