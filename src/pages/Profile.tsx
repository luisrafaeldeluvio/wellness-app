import { useLocation } from "wouter";
import Button from "../components/Button";
import Header from "../components/Header";
import { UserInfo, type IUserInfo } from "../db";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../services/userService";

type TEnegryBalance = "deficit" | "maintenance" | "surplus";

const Block = ({ children }: { children: React.ReactNode }) => {
  return <div className="aspect-square rounded-3xl border p-2">{children}</div>;
};

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
      <div className="flex flex-row items-center">
        <Button onClick={() => setLocation("/Menu")} style="mr-0">
          Back
        </Button>
        <Header>Profile</Header>
      </div>

      <form className="m-4">
        <fieldset>
          <div className="my-8 mt-0! flex flex-row justify-between">
            <label htmlFor="sex">Sex</label>
            <select
              id="sex"
              name="sex"
              defaultValue={user.sex}
              onBlur={(e) =>
                setUser({ ...user, sex: e.target.value as "male" | "female" })
              }
              className="appearance-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="my-8 flex flex-row justify-between">
            <label htmlFor="age">Age</label>
            <input
              className="w-1/12"
              type="number"
              id="age"
              name="age"
              defaultValue={user.age}
              onBlur={(e) => setUser({ ...user, age: Number(e.target.value) })}
            />
          </div>

          <div className="my-8 flex flex-row justify-between">
            <label htmlFor="height">Height</label>
            <input
              className="w-1/12"
              type="number"
              id="height"
              name="height"
              defaultValue={user.height}
              onBlur={(e) =>
                setUser({ ...user, height: Number(e.target.value) })
              }
            />
          </div>
        </fieldset>

        {/* Build a custom Drop down menu */}
        <div className="flex flex-col *:my-4">
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
        </div>
      </form>

      {/* <div className="flex shrink grow basis-2/4 flex-row flex-wrap gap-4 p-4"> */}
      <div className="m-4 grid grid-cols-2 gap-4">
        <Block>
          <div className="flex flex-row items-center justify-between">
            <span className="m-2">Weight</span>
            <Button></Button>
          </div>

          <div className="text-center">
            <span className="text-4xl font-bold">{userClass?.weight}</span>kg
          </div>
        </Block>

        <Block>
          <div className="flex flex-row items-center justify-between">
            <span className="m-2">BMR</span>
            <Button></Button>
          </div>

          <div className="text-center">
            <span className="text-xl font-bold">{userClass?.getBMR()}</span>
            kcal/day
          </div>
        </Block>

        <Block>
          <div className="flex flex-row items-center justify-between">
            <span className="m-2">TDEE</span>
            <Button></Button>
          </div>

          <div className="text-center">
            <span className="text-4xl font-bold">{userClass?.getTDEE()}</span>
            kcal
          </div>
        </Block>
      </div>
    </>
  );
};
export default Profile;
