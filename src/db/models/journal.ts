import dayjs from "dayjs";
import { type IFoodItem } from "./foodItem";

export interface IJournal {
  id?: number;
  date: string;
  foodItemIDs: number[];
  totalEnergy: number;
}

export class Journal implements IJournal {
  id!: number;
  date!: string;
  foodItemIDs!: number[];
  totalEnergy!: number;

  constructor(date: string) {
    this.date = dayjs(date).format("YYYY-MM-DD");
    this.foodItemIDs = [];
    this.totalEnergy = 0;
  }

  addFood(foodItemID: number, foodItem: IFoodItem) {
    this.foodItemIDs.push(foodItemID);
    this.totalEnergy += foodItem.energy;
  }
}
