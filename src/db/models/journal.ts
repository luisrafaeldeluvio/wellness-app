import { IFoodLog } from "./foodLog";

export interface IJournal {
  id?: number;
  date: string;
  foodLogIDs: number[];
  totalCalories: number;
}

export class Journal implements IJournal {
  id!: number;
  date!: string;
  foodLogIDs!: number[];
  totalCalories!: number;

  constructor(date: string) {
    this.date = date;
    this.foodLogIDs = [];
    this.totalCalories = 0;
  }

  async addFood(logID: number, foodLog: IFoodLog) {
    this.foodLogIDs.push(logID);
    this.totalCalories += foodLog.calorie;
  }
}
