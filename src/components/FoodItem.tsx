import type { IFoodItem } from "../db/models/foodItem";

interface FoodItemProps {
  data: IFoodItem;
}

const FoodItem = ({ data }: FoodItemProps) => {
  return (
    <li key={data.id}>
      <img src="src\assets\icons\temp_icon.svg" />
      <span>{data.name}</span>
      <span>{data.energy} kcal</span>
    </li>
  );
};

export default FoodItem;
