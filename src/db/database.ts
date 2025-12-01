import "fake-indexeddb/auto";
import Dexie, { type Table } from "dexie";
import { IWeightLog } from "./models/weight";
import { UserInfo } from "./models/user";
import { type IFoodItem } from "./models/foodItem";
import { Journal } from "./models/journal";

export class AppDB extends Dexie {
  userinfo!: Table<UserInfo, number>;
  weightlog!: Table<IWeightLog, number>;
  fooditem!: Table<IFoodItem, number>;
  journal!: Table<Journal, number>;

  constructor() {
    super("userdata");
    this.version(1).stores({
      userinfo: "++",
      weightlog: "++id, date",
      fooditem: "++id, date",
      journal: "++id, date",
    });
    this.userinfo.mapToClass(UserInfo);
    this.journal.mapToClass(Journal);
  }
}
