import { db } from "../db";
import { IUserInfo } from "../db/models/user";

// USER_KEY represents the primary key for the single user profile in the database.
const USER_KEY = 1;

export async function getUser() {
  return await db.userinfo.get(USER_KEY);
}

export async function updateUser(user: IUserInfo) {
  await db.userinfo.update(USER_KEY, user);
}
