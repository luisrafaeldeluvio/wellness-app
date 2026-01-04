import { useLocation } from "wouter";
import Button from "../components/Button";
import Header from "../components/Header";
import { UserInfo, type IUserInfo } from "../db";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../services/userService";

type TEnegryBalance = "deficit" | "maintenance" | "surplus";

const Profile = () => {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<IUserInfo>();

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      if (user) {
        const userInfo = new UserInfo(user);
        updateUser(userInfo);
        return;
      }

      // Loads the user data from the db
      const userInfo = await getUser();
      if (userInfo) setUser({ ...userInfo });
    })();

    return () => {
      ignore = true;
    };
  }, [user]);

  if (!user) return;

  return (
    <>
      <div>
        <Button onClick={() => setLocation("/Menu")}>Back</Button>
        <Header>Profile</Header>
      </div>

      <form>
        <label>
          Male
          <input
            type="radio"
            name="sex"
            value="male"
            checked={user.sex === "male"}
            onBlur={() => setUser({ ...user, sex: "male" })}
          />
        </label>
        <label>
          Female
          <input
            type="radio"
            name="sex"
            value="female"
            checked={user.sex === "female"}
            onBlur={() => setUser({ ...user, sex: "female" })}
          />
        </label>

        <input
          type="number"
          name="age"
          defaultValue={user.age}
          onBlur={(e) => setUser({ ...user, age: Number(e.target.value) })}
        />

        <input
          type="number"
          name="height"
          defaultValue={user.height}
          onBlur={(e) => setUser({ ...user, height: Number(e.target.value) })}
        />

        <select
          name="energyBalance"
          defaultValue={user.energyBalance}
          onBlur={(e) =>
            setUser({
              ...user,
              energyBalance: e.target.value as TEnegryBalance,
            })
          }
        >
          <option value="deficit">Deficit</option>
          <option value="maintenance">Maintenance</option>
          <option value="surplus">Surplus</option>
        </select>
      </form>
    </>
  );
};
export default Profile;
