import { useEffect, useState } from "react";
import { UserInfo, type Journal } from "../db";
import Button from "./Button";
import { getUser } from "../services/userService";

interface JournalProp {
  data: Journal;
}

const JournalSummary = ({ data }: JournalProp) => {
  const [user, setUser] = useState<UserInfo>();

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      if (user) return;

      const userInfo = await getUser();
      if (userInfo) setUser(new UserInfo(userInfo));
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className="m-4 mx-auto flex w-[90%] flex-col justify-around rounded-4xl border p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold">Calories</span>
            <span>
              <span className="font-semibold">
                {data.totalEnergy.intake + data.totalEnergy.outflow + " kcal "}
              </span>
              {"left of " + user?.getCalorieIntake() + " kcal"}s
            </span>
          </div>

          <Button style="m-0!">
            <img src="src/assets/icons/add_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg" />
          </Button>
        </div>

        <div className="m-2 -mx-4 h-0 border-b border-black"></div>

        <div className="flex w-full flex-row items-center justify-between">
          <div>{/*placeholder */}</div>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col items-center">
              <span>Eaten</span>
              <span className="font-bold">{data.totalEnergy.intake} kcal</span>
            </div>

            <div className="flex flex-col items-center">
              <span>Burned</span>
              <span className="font-bold">{data.totalEnergy.outflow} kcal</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalSummary;
