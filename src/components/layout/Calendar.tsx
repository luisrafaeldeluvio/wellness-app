import { Link } from "wouter";
import Button from "../ui/Button";
import { Dayjs } from "dayjs";
import chevronLeftIcon from "../../assets/icons/chevron_left_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import chevronRightIcon from "../../assets/icons/chevron_right_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";

interface DateProps {
  date: Dayjs;
}

const CalendarHead = ({ date }: DateProps) => {
  const jumpDate = (day: number) => date.add(day, "day").format("YYYY-MM-DD");

  return (
    <div className="m-4 mx-auto flex h-18 w-[90%] flex-row items-center justify-around rounded-4xl border">
      <Link href={`/${jumpDate(-1)}`}>
        <Button>
          <img src={chevronLeftIcon} alt="Previous Day" />
        </Button>
      </Link>

      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">
          {date.format("MMMM DD, YYYY")}
        </span>
        <span>{date.format("dddd")}</span>
      </div>

      <Link href={`/${jumpDate(1)}`}>
        <Button>
          <img src={chevronRightIcon} alt="Next day" />
        </Button>
      </Link>
    </div>
  );
};

export default CalendarHead;
