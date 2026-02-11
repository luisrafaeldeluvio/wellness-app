import dayjs, { Dayjs } from "dayjs";
import { addFoodItem } from "../../services/foodItemService";
import { addJournal, getJournalByDate } from "../../services/journalService";
import { useLocation, useParams } from "wouter";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import checkIcon from "../../assets/icons/check_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import FoodInfo from "../../components/layout/FoodInfo";

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
  { label: "Proteins", id: "proteins_100g", unit: "g" },
  { label: "Carbohydrates", id: "carbohydrates_100g", unit: "g" },
  { label: "Total Fat", id: "fat_100g", unit: "g" },
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
    const parseNum = (key: string) => {
      const value = data.get(key);
      return value !== null && value !== "" ? Number(value) : undefined;
    };

    const formData = {
      date: data.get("date") as string,
      name: data.get("name") as string,
      servingSize: data.get("serving_size") as string,
      consumed_g: parseNum("consumed_g") as number,

      "energy-kcal_100g": parseNum("energy-kcal_100g") as number,
      proteins_100g: parseNum("proteins_100g"),
      carbohydrates_100g: parseNum("carbohydrates_100g"),
      sugars_100g: parseNum("sugars_100g"),
      fat_100g: parseNum("fat_100g"),
      "saturated-fat_100g": parseNum("saturated-fat_100g"),
      fiber_100g: parseNum("fiber_100g"),
      sodium_100g: parseNum("sodium_100g"),
    };

    if (
      !formData.date ||
      !formData.name ||
      !formData.servingSize ||
      !formData.consumed_g ||
      !formData["energy-kcal_100g"]
    ) {
      console.error("No data in form");
      return;
    }

    let journal = await getJournalByDate(formData.date);
    if (journal === undefined) {
      journal = {
        date: dayjs(formData.date).format("YYYY-MM-DD"),
        foodItemIDs: [],
        totalEnergy: {
          intake: 0,
          outflow: 0,
        },
      };
      await addJournal(journal);
    }

    await addFoodItem(journal, {
      date: formData.date,
      name: formData.name,
      code: "CUSTOM_FOOD",
      serving_size: formData.servingSize,
      consumed_g: formData.consumed_g,
      nutriments: {
        "energy-kcal_100g": formData["energy-kcal_100g"],
        proteins_100g: formData.proteins_100g,
        carbohydrates_100g: formData.carbohydrates_100g,
        sugars_100g: formData.sugars_100g,
        fat_100g: formData.fat_100g,
        "saturated-fat_100g": formData["saturated-fat_100g"],
        fiber_100g: formData.fiber_100g,
        sodium_100g: formData.sodium_100g,
      },
    });

    setLocation(`/journal/${dayjs(formData.date).format("YYYY-MM-DD")}`);
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
        <FoodInfo
          defaultValue={{
            date: date.format("YYYY-MM-DD"),
          }}
        ></FoodInfo>

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
