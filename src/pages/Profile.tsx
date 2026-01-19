import { useLocation } from "wouter";
import Button from "../components/Button";
import Header from "../components/Header";
import { UserInfo, type IUserInfo } from "../db";
import { useEffect, useMemo, useState } from "react";
import { getUser, updateUser } from "../services/userService";
import Accordion from "../components/Accordion";

type TEnegryBalance = "deficit" | "maintenance" | "surplus";

const Block = ({ children }: { children: React.ReactNode }) => {
  return <div className="aspect-square rounded-3xl border p-2">{children}</div>;
};

interface SelectOptionProp {
  title: string;
  desc: string;
  value: any;
  user: IUserInfo | undefined;
  selected: boolean;
  x: string;
  setUser: React.Dispatch<React.SetStateAction<IUserInfo | undefined>>;
}

const SelectOption = ({
  title,
  desc,
  value,
  user,
  selected,
  x,
  setUser,
}: SelectOptionProp) => {
  return (
    <li>
      <button
        className={`m-2 text-left ${selected ? "rounded-2xl border p-2" : ""}`}
        type="button"
        onClick={() => {
          if (!user) return;
          setUser({ ...user, [x]: value });
        }}
      >
        <p className="font-bold">{title}</p>
        <p>{desc}</p>
      </button>
    </li>
  );
};

const activityLevels = [
  {
    name: "Very Light",
    value: 1.4,
    desc: "Minimal movement, mostly sitting or resting.",
  },
  {
    name: "Light",
    value: 1.6,
    desc: "Easy daily activities and slow-paced walking.",
  },
  {
    name: "Moderate",
    value: 1.8,
    desc: "Brisk movement that raises your heart rate.",
  },
  {
    name: "Heavy",
    value: 2.1,
    desc: "Intense exercise or strenuous manual labor.",
  },
];

const energyBalances = [
  {
    name: "Deficit",
    value: "deficit",
    desc: "Eating fewer calories than your body burns to lose weight.",
  },
  {
    name: "Maintenance",
    value: "maintenance",
    desc: "Eating the same amount of calories your body burns to stay the same weight.",
  },
  {
    name: "Surplus",
    value: "surplus",
    desc: "Eating more calories than your body burns to gain weight.",
  },
];

const Profile = () => {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<IUserInfo>();

  const userClass = useMemo(() => {
    return user ? new UserInfo(user) : null;
  }, [user]);

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      if (user) return;

      const userInfo = await getUser();
      if (userInfo) setUser({ ...userInfo });
    })();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      if (!user) return;

      const userInfo = new UserInfo(user);
      await updateUser(userInfo);
    })();

    return () => {
      ignore = true;
    };
  }, [user]);

  if (!user) return;

  return (
    <>
      {/* should i make a component for this back button + header? */}
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

        <div className="flex flex-col *:my-4">
          <Accordion
            renderHeader={(show) => (
              <p className={"m-2" + (show ? " mb-4" : "")}>Activity Level</p>
            )}
          >
            <div className="flex flex-col">
              {activityLevels.map(({ name, value, desc }) => {
                return (
                  <SelectOption
                    title={name}
                    desc={desc}
                    value={Number(value)}
                    user={user}
                    selected={user.activityLevel === value}
                    x="activityLevel"
                    setUser={setUser}
                  ></SelectOption>
                );
              })}
            </div>
          </Accordion>

          <Accordion
            renderHeader={(show) => (
              <p className={"m-2" + (show ? " mb-4" : "")}>Energy Balance</p>
            )}
          >
            <div className="flex flex-col">
              {energyBalances.map(({ name, value, desc }) => {
                return (
                  <SelectOption
                    title={name}
                    desc={desc}
                    value={String(value) as TEnegryBalance}
                    user={user}
                    selected={user.energyBalance === value}
                    x="energyBalance"
                    setUser={setUser}
                  ></SelectOption>
                );
              })}
            </div>
          </Accordion>
        </div>
      </form>

      <div className="m-4 grid grid-cols-2 gap-4">
        <Block>
          <div className="flex flex-row items-center justify-between">
            <span className="m-2">Weight</span>
            <Button onClick={() => setLocation("/logweight")}></Button>
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
