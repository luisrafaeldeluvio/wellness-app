import { AppDB } from "./database";

export const db = new AppDB();
export * from "./models/foodLog";
export * from "./models/journal";
export * from "./models/user";
export * from "./models/weight";
