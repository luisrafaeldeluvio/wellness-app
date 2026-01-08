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
  const [userClass, setUserClass] = useState<UserInfo | null>();

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      if (user) {
        setUserClass(new UserInfo(user));
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
        <select
          name="sex"
          defaultValue={user.sex}
          onBlur={(e) =>
            setUser({ ...user, sex: e.target.value as "male" | "female" })
          }
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

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
          name="activityLevel"
          defaultValue={user.activityLevel}
          onBlur={(e) =>
            setUser({ ...user, activityLevel: Number(e.target.value) })
          }
        >
          <option value="1.4">Very Light</option>
          <option value="1.6">Light</option>
          <option value="1.8">Moderate</option>
          <option value="2.1">Heavy</option>
        </select>

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

      <div>{userClass?.getEnergyOffset()}</div>
      <div>{userClass?.getBMR()}</div>
      <div>{userClass?.getTDEE()}</div>
    </>
  );
};
export default Profile;
