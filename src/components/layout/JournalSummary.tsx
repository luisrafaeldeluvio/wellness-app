import { useEffect, useState } from "react";
import { type IUserInfo, type IJournal } from "../../db";
import Button from "../ui/Button";
import { getCalorieIntake, getUser } from "../../services/userService";
import addIcon from "../../assets/icons/add_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";

interface JournalProp {
  data: IJournal;
}

const JournalSummary = ({ data }: JournalProp) => {
  const [user, setUser] = useState<IUserInfo>();

  useEffect(() => {
    let ignore: boolean = false;

    (async () => {
      if (user) return;

      const userInfo = await getUser();
      if (userInfo && !ignore) setUser(userInfo);
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
              {"left of " + (user ? getCalorieIntake(user) : 0) + " kcal"}s
            </span>
          </div>

          <Button style="m-0!">
            <img src={addIcon} />
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
