import { useLocation } from "wouter";
import Button from "../components/Button";
import Header from "../components/Header";
import { UserInfo, type IUserInfo } from "../db";
import { useEffect, useState } from "react";
import { getUser, initUser, updateUser } from "../services/userService";

const CreateProfile = () => {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<IUserInfo>();

  function createProfileFromForm(user: FormData) {
    const sex = (user.get("sex") as "male" | "female") || null;
    const age = Number(user.get("age")) || null;
    const height = Number(user.get("height")) || null;
    const energyBalance =
      (user.get("energyBalance") as "deficit" | "maintenance" | "surplus") ||
      null;
    const weight = Number(user.get("weight")) || null;
    const activityLevel = Number(user.get("activityLevel")) || null;

    if (
      !sex ||
      !age ||
      !height ||
      !weight ||
      !energyBalance ||
      !weight ||
      !activityLevel
    ) {
      return;
    }

    const userInfo: IUserInfo = {
      sex: sex,
      age: age,
      height: height,
      energyBalance: energyBalance,
      weight: weight,
      activityLevel: activityLevel,
      energyOffset: 0,
    };

    setUser(userInfo);
  }

  useEffect(() => {
    (async () => {
      if (!user) return;
      const userInfo = new UserInfo(user);
      userInfo.energyOffset = userInfo.getEnergyOffset();
      if (await initUser(userInfo)) setLocation("/home");
    })();
  }, [user]);

  return (
    <>
      <Header>Create Profile</Header>

      <form action={createProfileFromForm} name="createProfile">
        <label>
          Male
          <input type="radio" name="sex" value="male" required />
        </label>
        <label>
          Female
          <input type="radio" name="sex" value="female" required />
        </label>

        <input type="number" name="age" required />

        <input type="number" name="height" required />

        <input type="number" name="weight" required />

        <select name="activityLevel" required>
          <option value="1.4">Very Light</option>
          <option value="1.6">Light</option>
          <option value="1.8">Moderate</option>
          <option value="2.1">Heavy</option>
        </select>

        <select name="energyBalance" required>
          <option value="deficit">Deficit</option>
          <option value="maintenance">Maintenance</option>
          <option value="surplus">Surplus</option>
        </select>

        <input type="submit" value="create" />
      </form>
    </>
  );
};
export default CreateProfile;
