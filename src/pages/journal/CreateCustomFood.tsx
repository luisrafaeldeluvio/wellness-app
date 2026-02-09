import dayjs, { Dayjs } from "dayjs";
import { addFoodItem } from "../../services/foodItemService";
import { addJournal, getJournalByDate } from "../../services/journalService";
import { useLocation, useParams } from "wouter";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import checkIcon from "../../assets/icons/check_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";

interface DateParams {
  date: string;
}

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  label: string;
  unit?: string;
  inputClassName?: string;
}

const LabeledInput = ({
  containerClassName,
  label,
  unit,
  inputClassName,
  type,
  name,
  id,
  ...rest
}: LabeledInputProps) => {
  return (
    <div
      className={`my-8 flex flex-row items-center justify-between ${containerClassName}`}
    >
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          className={`w-16 text-right ${inputClassName}`}
          type={type}
          name={name}
          id={id}
          {...rest}
        />
        {unit}
      </div>
    </div>
  );
};

const nutrimentsInput = [
  { label: "Energy", id: "energy-kcal_100g", unit: "kcal" },
  { label: "Proteins", id: "proteins100g", unit: "g" },
  { label: "Carbohydrates", id: "carbohydrates100g", unit: "g" },
  { label: "Total Fat", id: "fat100g", unit: "g" },
  { label: "Sugars", id: "sugars_100g", unit: "g" },
  { label: "Saturated Fat", id: "saturated-fat_100g", unit: "g" },
  { label: "Fiber", id: "fiber_100g", unit: "g" },
  { label: "Sodium", id: "sodium_100g", unit: "g" },
];

const CreateCustomFood = () => {
  const [, setLocation] = useLocation();
  const dateParams = useParams<DateParams>();
  const date: Dayjs = dayjs(dateParams.date);

  async function addFoodItemFromForm(data: FormData) {
    const journalDate = data.get("journalDate") as string | null;
    const foodName = data.get("foodName") as string | null;
    const energy = data.get("energy") ? Number(data.get("energy")) : null;

    if (!journalDate || !foodName || !energy) {
      console.error("No data in form");
      return;
    }

    let journal = await getJournalByDate(journalDate);
    if (journal === undefined) {
      journal = {
        date: dayjs(journalDate).format("YYYY-MM-DD"),
        foodItemIDs: [],
        totalEnergy: {
          intake: 0,
          outflow: 0,
        },
      };
      await addJournal(journal);
    }

    await addFoodItem(journal, {
      date: journalDate,
      name: foodName,
      code: "123",
      serving_size: "10ggg",
      consumed_g: 120,
      nutriments: {
        "energy-kcal_100g": 100,
      },
    });

    setLocation(`/journal/${dayjs(journalDate).format("YYYY-MM-DD")}`);
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <Button
          onClick={() => setLocation(`/journal/${date.format("YYYY-MM-DD")}`)}
          style="mr-0"
        >
          Back
        </Button>
        <Header>Log Food</Header>
      </div>
      <form
        action={addFoodItemFromForm}
        name="logFood"
        autoComplete="on"
        className="m-4"
      >
        <fieldset>
          <LabeledInput
            inputClassName="w-32"
            containerClassName="mt-0!"
            label="Date"
            type="date"
            name="journalDate"
            id="journalDate"
            defaultValue={date.format("YYYY-MM-DD")}
            required
          ></LabeledInput>

          <LabeledInput
            inputClassName="w-32"
            label="Name"
            type="text"
            name="foodName"
            id="foodName"
            required
          ></LabeledInput>

          <LabeledInput
            inputClassName="w-32"
            label="Serving Size"
            type="text"
            name="servingSize"
            id="servingSize"
            required
          />

          <LabeledInput
            label="Consumed"
            type="number"
            name="consumedg"
            id="consumedg"
            unit="g"
            required
          />
        </fieldset>

        <fieldset>
          {nutrimentsInput.map(({ label, id, unit }) => (
            <LabeledInput
              label={label}
              type="number"
              name={id}
              id={id}
              unit={unit}
              required
            />
          ))}
        </fieldset>

        <Button style=" m-4 rounded-xl border bg-white p-2">
          <input
            type="image"
            className="flex size-9 items-center justify-center"
            src={checkIcon}
          />
        </Button>
      </form>
    </>
  );
};

export default CreateCustomFood;
