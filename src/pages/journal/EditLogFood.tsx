import { editFoodItem, getFoodItem } from "../../services/foodItemService";

import { useLocation, useParams } from "wouter";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import checkIcon from "../../assets/icons/check_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import { useEffect, useState } from "react";
// import { type IFoodItem } from "../db";

const EditLogFood = () => {
  const foodId = useParams<{ foodId: string }>();
  // const [food, setFood] = useState<IFoodItem>();
  const [, setLocation] = useLocation();

  // async function addFoodItemFromForm(data: FormData) {
  //   const journalDate = data.get("journalDate") as string | null;
  //   const foodName = data.get("foodName") as string | null;
  //   const energy = data.get("energy") ? Number(data.get("energy")) : null;

  //   if (!journalDate || !foodName || !energy) {
  //     console.error("No data in form");
  //     return;
  //   }

  //   if (food?.id)
  //     await editFoodItem(food.id, {
  //       name: foodName,
  //       energy: energy,
  //       date: journalDate,
  //     });

  //   setLocation("/journal");
  // }

  // useEffect(() => {
  //   (async () => {
  //     const data = await getFoodItem(Number(foodId));
  //     if (data) setFood(data);
  //   })();
  // }, []);

  return (
    <>
      <div className="flex flex-row items-center">
        <Button onClick={() => setLocation("~/journal")} style="mr-0">
          Cancel
        </Button>
        {/* <Header>Edit {food?.name}</Header> */}
      </div>
      <p>Under Construction</p>
      {/* <form
        action={addFoodItemFromForm}
        name="logFood"
        autoComplete="on"
        className="m-4"
      >
        <fieldset>
          <div className="my-8 mt-0! flex flex-row justify-between">
            <label htmlFor="journalDate">Date</label>
            <input
              type="date"
              name="journalDate"
              id="journalDate"
              defaultValue={food?.date}
              required
            />
          </div>

          <div className="my-8 flex flex-row justify-between">
            <label htmlFor="foodName">Name</label>
            <input
              className="text-right"
              type="text"
              name="foodName"
              id="foodName"
              required
              defaultValue={food?.name}
            />
          </div>

          <div className="my-8 flex flex-row justify-between">
            <label htmlFor="energy">Energy</label>
            <input
              className="text-right"
              type="number"
              name="energy"
              id="energy"
              required
              defaultValue={food?.energy}
            />
            kcal
          </div>
        </fieldset>

        <Button style="absolute right-0 bottom-0 m-4 rounded-xl border bg-white p-2">
          <input
            type="image"
            className="flex size-9 items-center justify-center"
            src={checkIcon}
          />
        </Button>
      </form> */}
    </>
  );
};

export default EditLogFood;
