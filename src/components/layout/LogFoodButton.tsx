import type { Dayjs } from "dayjs";
import { Link } from "wouter";
import addIcon from "../../assets/icons/add_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";

const LogFoodButton = ({ date }: { date: Dayjs }) => (
  <>
    <Link href={`/journal/logfood/${date.format("YYYY-MM-DD")}`}>
      <button className="absolute right-0 bottom-0 m-4 rounded-xl border bg-white p-2">
        <img src={addIcon} className="size-9" />
      </button>
    </Link>
  </>
);

export default LogFoodButton;
