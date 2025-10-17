import "fake-indexeddb/auto";
import Dexie, { type Table } from "dexie";
import { WeightLog } from "./models/weight";
import { UserInfo } from "./models/user";

export class AppDB extends Dexie {
  userinfo!: Table<UserInfo, number>;
  weightlog!: Table<WeightLog, number>;

  constructor() {
    super("userdata");
    this.version(1).stores({
      userinfo: "++, sex, age, height, weight, activityLevel, deficit",
      weightlog: "++, date, weight",
    });
    this.userinfo.mapToClass(UserInfo);
    this.weightlog.mapToClass(WeightLog);
  }
}
