import { useLocation } from "wouter";
import FoodInfo from "../../components/layout/FoodInfo";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import type { JournalFoodItem } from "../../db";

const FoodItemInfo = () => {
  const data: JournalFoodItem = window.history.state;
  const [, setLocation] = useLocation();

  return (
    <>
      <div className="flex flex-row items-center">
        <Button
          onClick={() => setLocation(`~/journal/${data.date}`)}
          style="mr-0"
        >
          Back
        </Button>
        <Header>Log Food</Header>
      </div>

      <div className="m-4">
        <FoodInfo
          defaultValue={{
            date: data.date,
            name: data.name,
            serving_size: data.serving_size,
            consumed_g: String(data.consumed_g),
            "energy-kcal_100g": String(data.nutriments["energy-kcal_100g"]),
            proteins_100g: String(data.nutriments.proteins_100g),
            carbohydrates_100g: String(data.nutriments.carbohydrates_100g),
            sugars_100g: String(data.nutriments.sugars_100g),
            fat_100g: String(data.nutriments.fat_100g),
            "saturated-fat_100g": String(data.nutriments["saturated-fat_100g"]),
            fiber_100g: String(data.nutriments.fiber_100g),
            sodium_100g: String(data.nutriments.sodium_100g),
          }}
          disabledInputs={true}
        ></FoodInfo>
      </div>
    </>
  );
};

export default FoodItemInfo;
