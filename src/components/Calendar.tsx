// import { useEffect, useRef, useState } from "react";
// import { type Options } from "vanilla-calendar-pro";
// import { Calendar as calendarClass } from "vanilla-calendar-pro";

// import "vanilla-calendar-pro/styles/index.css";

// interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
//   config?: Options;
// }

// const Calendar = ({ config, ...attributes }: CalendarProps) => {
//   const ref = useRef(null);
//   const [calendar, setCalendar] = useState<calendarClass | null>(null);

//   useEffect(() => {
//     if (!ref.current) return;
//     setCalendar(new calendarClass(ref.current, config));
//   }, [ref, config]);

//   useEffect(() => {
//     if (!calendar) return;
//     calendar.init();
//   }, [calendar]);

//   return <div {...attributes} ref={ref}></div>;
// };

// export default Calendar;

import Button from "./Button";
import dayjs from "dayjs";

interface DateProps {
  date: dayjs.Dayjs;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const CalendarHead = ({ date, setDate }: DateProps) => {
  return (
    <div className="m-4 mx-auto flex h-18 w-96 flex-row items-center justify-around rounded-4xl border p-6">
      <Button
        onClick={() => {
          setDate(date.add(-1, "day"));
        }}
      >
        <img
          src="src\assets\icons\chevron_left_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg"
          alt=""
        />
      </Button>

      <div className="flex flex-col items-center">
        <span className="font-bold">{date.format("MMMM DD, YYYY")}</span>
        <span>{date.format("dddd")}</span>
      </div>
      <Button
        onClick={() => {
          setDate(date.add(1, "day"));
        }}
      >
        <img
          src="src\assets\icons\chevron_right_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg"
          alt=""
        />
      </Button>
    </div>
  );
};

export default CalendarHead;
