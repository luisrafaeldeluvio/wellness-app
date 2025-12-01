const MealTypeArray = ["breakfast", "lunch", "dinner", "snacks"] as const;
export type TMealType = (typeof MealTypeArray)[number];

export interface IFoodLog {
  id?: number;
  date: string;
  time: string;
  mealType: TMealType;
  name: string;
  calorie: number;
}
