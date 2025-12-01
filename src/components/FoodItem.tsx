import type { IFoodLog } from "../db/models/foodLog";

interface LogItemProps {
  data: IFoodLog;
}

const FoodItem = ({ data }: LogItemProps) => {
  return (
    <div className="text-sm">
      <div className="flex flex-row items-center">
        <img className="m-2 size-12" src="src\assets\icons\temp_icon.svg" />
        <span>{data.name}</span>
        <span></span>
        <span className="absolute right-0 p-4">{data.calorie} kcal</span>
      </div>
    </div>
  );
};

export default FoodItem;
