import { useLocation } from "wouter";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import { type IUserInfo } from "../db";
import { useEffect, useState } from "react";
import {
  getBMR,
  getEnergyOffset,
  getTDEE,
  getUser,
  updateUser,
} from "../services/userService";
import Accordion from "../components/ui/Accordion";
import Block from "../components/ui/Block";
import helpIcon from "../assets/icons/help_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import addIcon from "../assets/icons/add_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";

type TEnegryBalance = "deficit" | "maintenance" | "surplus";

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

interface SelectOptionProp {
  title: string;
  desc: string;
  selected: boolean;
  data: string;
  onClick: () => void;
}

const SelectOption = ({
  title,
  desc,
  selected,
  data,
  onClick,
}: SelectOptionProp) => {
  return (
    <li key={data}>
      <button
        className={`m-2 text-left ${selected ? "rounded-2xl border p-2" : ""}`}
        type="button"
        onClick={() => onClick()}
      >
        <p className="font-bold">{title}</p>
        <p>{desc}</p>
      </button>
    </li>
  );
};

const Profile = () => {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<IUserInfo>();

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      if (user) return;

      const userInfo = await getUser();
      if (userInfo && !ignore) setUser({ ...userInfo });
    })();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      if (!user || ignore) return;

      await updateUser(user);
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
              className="text-right"
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
              className="text-right"
              type="number"
              id="height"
              name="height"
              defaultValue={user.height}
              onBlur={(e) =>
                setUser({ ...user, height: Number(e.target.value) })
              }
            />
            cm
          </div>
        </fieldset>

        <div className="flex flex-col *:my-4">
          <Accordion
            renderHeader={(show) => (
              <>
                <p className={"m-2" + (show ? " mb-4" : "")}>Activity Level</p>
                <p className={"m-2" + (show ? " mb-4" : "")}>
                  {user.activityLevel}
                </p>
              </>
            )}
          >
            <div className="flex flex-col">
              {activityLevels.map(({ name, value, desc }) => {
                return (
                  <SelectOption
                    title={name}
                    desc={desc}
                    selected={user.activityLevel === value}
                    data="activityLevel"
                    onClick={() => {
                      if (!user) return;
                      setUser({ ...user, activityLevel: value });
                    }}
                  ></SelectOption>
                );
              })}
            </div>
          </Accordion>

          <Accordion
            renderHeader={(show) => (
              <>
                <p className={"m-2" + (show ? " mb-4" : "")}>Energy Balance</p>
                <p className={"m-2" + (show ? " mb-4" : "")}>
                  {user.energyOffset} kcal
                </p>
              </>
            )}
          >
            <div className="flex flex-col">
              {energyBalances.map(({ name, value, desc }) => {
                return (
                  <SelectOption
                    title={name}
                    desc={desc}
                    selected={user.energyBalance === value}
                    data="energyBalance"
                    onClick={() => {
                      if (!user) return;
                      setUser({
                        ...user,
                        energyBalance: value as TEnegryBalance,
                        energyOffset: getEnergyOffset(user),
                      });
                    }}
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
            <Button style="m-2! p-1!" onClick={() => setLocation("/logweight")}>
              <img src={addIcon} alt="Log weight" />
            </Button>
          </div>

          <div className="text-center">
            <span className="text-4xl font-bold">{user.weight}</span>kg
          </div>
        </Block>

        <Block>
          <div className="flex flex-row items-center justify-between">
            <span className="m-2">BMR</span>
            <Button style="m-2! p-1!">
              <img src={helpIcon} alt="Help" />
            </Button>
          </div>

          <div className="text-center">
            <span className="text-xl font-bold">{getBMR(user)}</span>
            kcal/day
          </div>
        </Block>

        <Block>
          <div className="flex flex-row items-center justify-between">
            <span className="m-2">TDEE</span>
            <Button style="m-2! p-1!">
              <img src={helpIcon} alt="Help" />
            </Button>
          </div>

          <div className="text-center">
            <span className="text-4xl font-bold">{getTDEE(user)}</span>
            kcal
          </div>
        </Block>
      </div>
    </>
  );
};
export default Profile;
