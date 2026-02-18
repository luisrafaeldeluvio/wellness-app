export interface FoodItem {
  code: string;
  name: string;
  serving_size: string;
  nutriments: {
    "energy-kcal_100g": number;
    proteins_100g?: number;
    carbohydrates_100g?: number;
    sugars_100g?: number;
    fat_100g?: number;
    "saturated-fat_100g"?: number;
    fiber_100g?: number;
    sodium_100g?: number;
  };
}

export type JournalFoodItem = FoodItem & {
  id?: number;
  date: string;
  consumed_g: number;
};
