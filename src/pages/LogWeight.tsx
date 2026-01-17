import dayjs from "dayjs";
import { useLocation } from "wouter";
import Header from "../components/Header";
import { addWeight, getWeight } from "../services/weightService";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import checkIcon from "../assets/icons/check_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";

const LogWeight = () => {
  const [, setLocation] = useLocation();
  const [currentWeight, setCurentWeight] = useState<number>();

  useEffect(() => {
    (async () => await getWeight().then((e) => setCurentWeight(e?.weight)))();
  }, []);

  async function logWeightFromForm(data: FormData) {
    const weight = data.get("weight") ? Number(data.get("weight")) : null;

    if (!weight) {
      console.error("No data in form");
      return;
    }

    addWeight({
      date: data.get("weightDate") as string,
      weight: weight,
    });

    setLocation("/home");
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <Button onClick={() => setLocation("/journal")} style="mr-0">
          Back
        </Button>
        <Header>Log Weight</Header>
      </div>

      <form action={logWeightFromForm} name="logWeight" className="m-4">
        <fieldset>
          <div className="my-8 mt-0! flex flex-row justify-between">
            <label htmlFor="weightDate">Date</label>
            <input
              type="date"
              name="weightDate"
              id="weightDate"
              defaultValue={dayjs().format("YYYY-MM-DD")}
              required
            />
          </div>

          <div className="my-8 mt-0! flex flex-row justify-between">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              name="weight"
              id="weight"
              defaultValue={currentWeight}
              required
              className="text-right"
            />
            kg
          </div>

          <Button style="absolute right-0 bottom-0 m-4 rounded-xl border bg-white p-2">
            <input
              type="image"
              className="flex size-9 items-center justify-center"
              src={checkIcon}
            />
          </Button>
        </fieldset>
      </form>
    </>
  );
};

export default LogWeight;
