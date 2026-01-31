export interface GenericJournalItem {
  id?: number;
  date: string;
  name: string;
}

export interface GenericActivityItem extends GenericJournalItem {
  energy: number;
  duration: number;
}

export interface FoodItem extends GenericJournalItem {
  code: string;
  serving_size: string;
  consumed_g: number;
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
