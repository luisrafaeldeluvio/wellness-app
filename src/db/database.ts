import Dexie, { type Table } from "dexie";
import { type IWeightLog } from "./models/weight";
import { type IUserInfo } from "./models/user";
import { type FoodItem } from "./models/foodItem";
import { type IJournal } from "./models/journal";

export class AppDB extends Dexie {
  userinfo!: Table<IUserInfo, number>;
  weightlog!: Table<IWeightLog, number>;
  fooditem!: Table<FoodItem, number>;
  journal!: Table<IJournal, number>;

  constructor() {
    super("userdata");
    this.version(1).stores({
      userinfo: "++",
      weightlog: "++id, date",
      fooditem: "++id, date",
      journal: "++id, date",
    });
  }
}
