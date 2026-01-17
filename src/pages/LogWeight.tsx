import dayjs from "dayjs";
import { useLocation } from "wouter";
import Header from "../components/Header";
import { addWeight } from "../services/weightService";

const LogWeight = () => {
  const [, setLocation] = useLocation();

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
  }

  return (
    <>
      <Header>Log Food</Header>
      <form action={logWeightFromForm} name="logWeight">
        <fieldset>
          <legend>Log Weight</legend>

          <label htmlFor="weightDate">Date</label>
          <input
            type="date"
            name="weightDate"
            id="weightDate"
            defaultValue={dayjs().format("YYYY-MM-DD")}
            required
          />

          <label htmlFor="weight">Weight</label>
          <input type="number" name="weight" id="weight" required />

          <input type="submit" value="Add" />
        </fieldset>
      </form>
    </>
  );
};

export default LogWeight;
