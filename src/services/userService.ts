import { db, IUserInfo } from "../db";

// USER_KEY represents the primary key for the single user profile in the database.
const USER_KEY = 1;

const getUser = async () => await db.userinfo.get(USER_KEY);

const initUser = async (user: IUserInfo) => await db.userinfo.add(user);

const updateUser = async (user: IUserInfo) =>
  await db.userinfo.update(USER_KEY, user);

// Mifflin-St Jeor's Equation
const getBMR = (user: IUserInfo) => {
  const sexMod = user.sex === "male" ? 5 : -161;
  return 10 * user.weight + 6.25 * user.height - 5 * user.age + sexMod;
};

const getTDEE = (user: IUserInfo) => getBMR(user) * user.activityLevel;

const getCalorieIntake = (user: IUserInfo) => {
  const intake: number = getTDEE(user) - user.deficit;
  return Math.max(user.sex === "male" ? 1500 : 1200, intake);
};

export { getUser, initUser, updateUser, getBMR, getTDEE, getCalorieIntake };
