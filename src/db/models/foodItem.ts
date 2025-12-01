const MealTypeArray = ["breakfast", "lunch", "dinner", "snacks"] as const;
export type TMealType = (typeof MealTypeArray)[number];

export interface IFoodItem {
  id?: number;
  date: string;
  mealType: TMealType;
  name: string;
  energy: number;
}
