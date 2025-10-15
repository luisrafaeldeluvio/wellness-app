import "fake-indexeddb/auto";
import Dexie, { type Table } from "dexie";
import { WeightLog } from "./models/weight";

export class AppDB extends Dexie {
  weightlog!: Table<WeightLog, number>;

  constructor() {
    super("userdata");
    this.version(1).stores({
      weightlog: "++, date, weight",
    });
    this.weightlog.mapToClass(WeightLog);
  }  
}
