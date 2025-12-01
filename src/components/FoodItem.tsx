import type { IFoodItem } from "../db/models/foodItem";

interface FoodItemProps {
  data: IFoodItem;
}

const FoodItem = ({ data }: FoodItemProps) => {
  return (
    <div className="text-sm">
      <div className="flex flex-row items-center">
        <img className="m-2 size-12" src="src\assets\icons\temp_icon.svg" />
        <span>{data.name}</span>
        <span></span>
        <span className="absolute right-0 p-4">{data.energy} kcal</span>
      </div>
    </div>
  );
};

export default FoodItem;
