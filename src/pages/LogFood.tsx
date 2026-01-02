import dayjs from "dayjs";
import { addFoodItem } from "../services/foodItemService";
import { addJournal, getJournalByDate } from "../services/journalService";
import { Journal } from "../db";
import { useLocation } from "wouter";

const LogFood = () => {
  const [, setLocation] = useLocation();

  async function addFoodItemFromForm(data: FormData) {
    const journalDate = data.get("journalDate") as string | null;
    const foodName = data.get("foodName") as string | null;
    const energy = data.get("energy") as number | null;

    if (!journalDate || !foodName || !energy) {
      console.error("No data in form");
      return;
    }

    let journal = await getJournalByDate(journalDate);
    if (journal === undefined) {
      journal = new Journal(journalDate);
      await addJournal(journal);
    }

    await addFoodItem(journal, {
      date: journalDate,
      name: foodName,
      energy: energy,
    });

    setLocation("/journal");
  }

  return (
    <>
      <form action={addFoodItemFromForm} name="logFood" autoComplete="on">
        <fieldset>
          <legend>Log New Food</legend>

          <label htmlFor="journalDate">Date</label>
          <input
            type="date"
            name="journalDate"
            id="journalDate"
            defaultValue={dayjs().format("YYYY-MM-DD")}
            required
          />

          <label htmlFor="foodName">Name</label>
          <input type="text" name="foodName" id="foodName" required />

          <label htmlFor="energy">Energy</label>
          <input type="number" name="energy" id="energy" required />
          <input type="submit" value="Add" />
        </fieldset>
      </form>
    </>
  );
};

export default LogFood;
