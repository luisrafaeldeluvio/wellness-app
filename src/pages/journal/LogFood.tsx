import dayjs, { Dayjs } from "dayjs";
import { Link, useLocation, useParams } from "wouter";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import searchIcon from "../../assets/icons/search_24dp_000000_FILL1_wght200_GRAD0_opsz24.svg";
import barcodeIcon from "../../assets/icons/barcode_scanner_24dp_000000_FILL1_wght200_GRAD0_opsz24.svg";
import addIcon from "../../assets/icons/add_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";

interface DateParams {
  date: string;
}

const DefaultNoSearch = () => {};

const NoSearchResult = () => {};

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

      <Link href={`/journal/logfood/create`}>
        <button className="absolute right-0 bottom-0 m-4 rounded-xl border bg-white p-2">
          <img src={addIcon} className="size-9" />
        </button>
      </Link>
    </>
  );
};

export default LogFood;
