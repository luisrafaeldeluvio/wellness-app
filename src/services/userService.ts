import { db } from "../db";
import { UserInfo } from "../db/models/user";

// USER_KEY represents the primary key for the single user profile in the database.
const USER_KEY = 1;

export const getUser = async () => await db.userinfo.get(USER_KEY);

export const initUser = async (user: UserInfo) => await db.userinfo.add(user);

export const updateUser = async (user: UserInfo) =>
  await db.userinfo.update(USER_KEY, user);
