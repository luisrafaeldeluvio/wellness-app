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
    this.totalEnergy = {
      intake: 0,
      outflow: 0,
    };
  }

  addFood(foodItemID: number, foodItem: IFoodItem) {
    this.foodItemIDs.push(foodItemID);

    const energy = Number(foodItem.energy);
    if (energy < 0) {
      this.totalEnergy.outflow += energy;
    } else {
      this.totalEnergy.intake += energy;
    }
  }
}
