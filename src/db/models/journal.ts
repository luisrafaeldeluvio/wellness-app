import dayjs from "dayjs";
import { type IFoodItem } from "./foodItem";

export interface IJournal {
  id?: number;
  date: string;
  foodItemIDs: number[];
  totalEnergy: {
    intake: number;
    outflow: number;
  };
}

export class Journal implements IJournal {
  id!: number;
  date!: string;
  foodItemIDs!: number[];
  totalEnergy!: {
    intake: number;
    outflow: number;
  };

  constructor(date: string) {
    this.date = dayjs(date).format("YYYY-MM-DD");
    this.foodItemIDs = [];
    this.totalEnergy.intake = 0;
    this.totalEnergy.outflow = 0;
  }

  addFood(foodItemID: number, foodItem: IFoodItem) {
    this.foodItemIDs.push(foodItemID);
    if (foodItem.energy < 0) {
      this.totalEnergy.outflow += foodItem.energy;
    } else {
      this.totalEnergy.intake += foodItem.energy;
    }
  }
}
