import { AppDB } from "./database";

export const db = new AppDB();
export * from "./models/foodItem";
export * from "./models/journal";
export * from "./models/user";
export * from "./models/weight";
