import { Link } from "wouter";

const LogFoodButton = () => (
  <>
    <Link href="/log/logfood">
      <button className="absolute right-0 bottom-0 m-4 rounded-xl border bg-white p-2">
        <img
          src="src/assets/icons/add_circle_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg"
          className="size-9"
        />
      </button>
    </Link>
  </>
);

export default LogFoodButton;
