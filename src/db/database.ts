import "fake-indexeddb/auto";
import Dexie, { type Table } from "dexie";
import { IWeightLog } from "./models/weight";
import { UserInfo } from "./models/user";

export class AppDB extends Dexie {
  userinfo!: Table<UserInfo, number>;
  weightlog!: Table<IWeightLog, number>;

  constructor() {
    super("userdata");
    this.version(1).stores({
      userinfo: "++",
      weightlog: "++, date",
    });
    this.userinfo.mapToClass(UserInfo);
  }
}
