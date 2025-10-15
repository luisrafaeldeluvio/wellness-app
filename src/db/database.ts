import "fake-indexeddb/auto";
import Dexie, { type EntityTable } from "dexie";
import { WeightLog } from "./models/weight";

export class AppDB extends Dexie {
  weightlog!: EntityTable<WeightLog, "date">;

  constructor() {
    super("userdata");
    this.version(1).stores({
      weightlog: "date, weight",
    });
    this.weightlog.mapToClass(WeightLog);
  }  
}
