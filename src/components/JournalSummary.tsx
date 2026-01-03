import Button from "./Button";

const JournalSummary = () => {
  return (
    <>
      <div className="m-4 mx-auto flex w-96 flex-col justify-around rounded-4xl border p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold">Calories</span>
            <span>
              <span className="font-semibold">750 kcal</span> left of 1500 kcal
            </span>
          </div>

          <Button style="m-0!">
            <img src="src/assets/icons/add_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg" />
          </Button>
        </div>

        <div className="m-2 -mx-4 border border-black"></div>

        <div className="flex w-full flex-row items-center justify-between">
          <div>{/*placeholder */}</div>

          <div className="flex flex-row gap-5">
            <div className="flex flex-col items-center">
              <span>Eaten</span>
              <span className="font-bold">100kcal</span>
            </div>

            <div className="flex flex-col items-center">
              <span>Burned</span>
              <span className="font-bold">200kcal</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalSummary;
