import { db, type IFoodItem, IJournal } from "../db";
import { addFoodToJournal } from "./journalService";

/**
 * Adds a new food item entry to the database and updates the associated Journal
 * with the new item's ID.
 * @param journal The Journal object to reference the food item.
 * @param fooditem The food data to be added to the database.
 */
export const addFoodItem = async (
  journal: IJournal,
  fooditem: IFoodItem,
): Promise<void> => {
  await db.fooditem.add(fooditem);

  addFoodToJournal(journal, fooditem);
};

/**
 * Gets a food item entry from the DB using its ID.
 * @param id The ID of the food item.
 * @returns A promise that resolves to a food item object or undefined if no entry is found with the given id.
 */
export const getFoodItem = async (id: number): Promise<IFoodItem | undefined> =>
  await db.fooditem.get(id);
