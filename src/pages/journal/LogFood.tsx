import dayjs, { Dayjs } from "dayjs";
import { addFoodItem } from "../../services/foodItemService";
import { addJournal, getJournalByDate } from "../../services/journalService";
import { useLocation, useParams } from "wouter";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import checkIcon from "../../assets/icons/check_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import searchIcon from "../../assets/icons/search_24dp_000000_FILL1_wght200_GRAD0_opsz24.svg";
import barcodeIcon from "../../assets/icons/barcode_scanner_24dp_000000_FILL1_wght200_GRAD0_opsz24.svg";

interface DateParams {
  date: string;
}

const DefaultNoSearch = () => {};

const NoSeaerchResult = () => {};

const LogFood = () => {
  const [, setLocation] = useLocation();
  const dateParams = useParams<DateParams>();
  const date: Dayjs = dayjs(dateParams.date);

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

      <div className="m-4 mx-auto flex h-18 w-[90%] flex-row items-center justify-around rounded-4xl border">
        <Button>
          <img src={searchIcon} alt="Search for Food" />
        </Button>

        <form action={() => {}}>
          <input
            type="search"
            name="searchOpenFoodFacts"
            id="searchOpenFoodFacts"
            required
          />
        </form>

        <Button style="border-0!">
          <img src={barcodeIcon} alt="Scan a barcode" />
        </Button>
      </div>
    </>
  );
};

export default LogFood;

//  async function addFoodItemFromForm(data: FormData) {
//     const journalDate = data.get("journalDate") as string | null;
//     const foodName = data.get("foodName") as string | null;
//     const energy = data.get("energy") ? Number(data.get("energy")) : null;

//     if (!journalDate || !foodName || !energy) {
//       console.error("No data in form");
//       return;
//     }

//     let journal = await getJournalByDate(journalDate);
//     if (journal === undefined) {
//       journal = {
//         date: dayjs(journalDate).format("YYYY-MM-DD"),
//         foodItemIDs: [],
//         totalEnergy: {
//           intake: 0,
//           outflow: 0,
//         },
//       };
//       await addJournal(journal);
//     }

//     await addFoodItem(journal, {
//       date: journalDate,
//       name: foodName,
//       code: "123",
//       serving_size: "10ggg",
//       consumed_g: 120,
//       nutriments: {
//         "energy-kcal_100g": 100,
//       },
//     });

//     setLocation(`/journal/${dayjs(journalDate).format("YYYY-MM-DD")}`);
//   }

{
  /* <form
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
        defaultValue={date.format("YYYY-MM-DD")}
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
</form>; */
}
