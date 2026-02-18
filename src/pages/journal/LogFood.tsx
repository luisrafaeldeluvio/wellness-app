import { Link } from "wouter";
import { PageHeader } from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import searchIcon from "../../assets/icons/search_24dp_000000_FILL1_wght200_GRAD0_opsz24.svg";
import barcodeIcon from "../../assets/icons/barcode_scanner_24dp_000000_FILL1_wght200_GRAD0_opsz24.svg";
import addIcon from "../../assets/icons/add_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import { useState } from "react";
import { getFoodSearchResults } from "../../services/openFoodFacts";
import { type FoodItem as IFoodItem } from "../../db";
import FoodItem from "../../components/layout/FoodItem";

const DefaultNoSearch = () => {};

const NoSearchResult = () => {};

const LogFood = () => {
  const [searchResult, setSearchResult] = useState<IFoodItem[]>();
  const [callingAPI, setCallingAPI] = useState<boolean | null>(null);

  const handleSearch = async (data: FormData) => {
    setSearchResult(
      await getFoodSearchResults({
        searchTerm: String(data.get("searchOpenFoodFacts")),
      }),
    );

    setCallingAPI(false);
  };

  return (
    <>
      <PageHeader headerText="Log Food" />

      <div className="m-4 mx-auto flex h-18 w-[90%] flex-row items-center justify-around rounded-4xl border">
        <form
          className="just flex flex-row items-center"
          action={(e) => {
            setCallingAPI(true);
            handleSearch(e);
          }}
        >
          <Button style="shrink-0">
            <img src={searchIcon} alt="Search for Food" />
          </Button>

          <input
            className="w-full flex-1"
            type="search"
            name="searchOpenFoodFacts"
            id="searchOpenFoodFacts"
            required
          />
        </form>

        <Button style="shrink-0">
          <img src={barcodeIcon} alt="Scan a barcode" />
        </Button>
      </div>

      {callingAPI ? <p className="w-full text-center">searching...</p> : null}

      <div className="scroll-auto">
        {!callingAPI
          ? searchResult?.map((e) => {
              return (
                <FoodItem
                  key={e.code}
                  id={e.code}
                  name={e.name}
                  energy={e.nutriments["energy-kcal_100g"]}
                  options={{ disableDelete: true, disableEdit: true }}
                />
              );
            })
          : null}
      </div>

      <Link href={`/create`}>
        <Button style="fixed right-0 bottom-15 bg-white">
          <img src={addIcon} className="size-9" />
        </Button>
      </Link>
    </>
  );
};

export default LogFood;
