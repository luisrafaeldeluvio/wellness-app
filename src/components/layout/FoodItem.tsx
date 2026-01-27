import type { IFoodItem } from "../../db/models/foodItem";
import Button from "../ui/Button";
import trashIcon from "../../assets/icons/delete_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import editIcon from "../../assets/icons/edit_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg";
import { deleteFoodItem } from "../../services/foodItemService";
import { Link } from "wouter";
import { useEffect, useRef } from "react";
import tempIcon from "../../assets/icons/temp_icon.svg";

interface FoodItemProps {
  data: IFoodItem;
}

const FoodItem = ({ data }: FoodItemProps) => {
  const midRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    midRef.current?.scrollIntoView();
  }, []);

  return (
    <li
      key={data.id}
      className="scrollbar-none flex w-full min-w-0 snap-x snap-mandatory flex-row overflow-x-auto text-sm [scrollbar-width:none]"
    >
      <div className="flex shrink-0 basis-1/4 snap-end items-center justify-center bg-green-500">
        <Link href={`/journal/EditLogFood/${data.id}`}>
          <Button>
            <img src={editIcon} alt="Edit Entry" />
          </Button>
        </Link>
      </div>

      <div
        ref={midRef}
        className="flex shrink-0 basis-full snap-center items-center justify-center"
      >
        <img className="m-2 size-12" src={tempIcon} />
        <span>{data.name}</span>
        <span className="ml-auto p-4">{data.energy} kcal</span>
      </div>

      <div className="flex shrink-0 basis-1/4 snap-start items-center justify-center bg-red-500">
        <Button
          onClick={() => {
            if (window.confirm(`Delete ${data.name}?`)) {
              if (data) deleteFoodItem(data.id as number);
            }
          }}
        >
          <img src={trashIcon} alt="Delete Entry" />
        </Button>
      </div>
    </li>
  );
};

export default FoodItem;
