import type { IFoodItem } from "../../db/models/foodItem";

interface FoodItemProps {
  data: IFoodItem;
}

const FoodItem = ({ data }: FoodItemProps) => {
  return (
    <li key={data.id} className="flex flex-row items-center text-sm">
      <img className="m-2 size-12" src="src\assets\icons\temp_icon.svg" />
      <span>{data.name}</span>
      <span className="ml-auto p-4">{data.energy} kcal</span>
    </li>
  );
};

export default FoodItem;
