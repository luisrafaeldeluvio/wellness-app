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

const CalendarHead = () => {
  return (
    <div className="m-4 mx-auto flex h-18 w-96 flex-row items-center justify-around rounded-4xl border p-6">
      <Button>
        <img
          src="src\assets\icons\chevron_left_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg"
          alt=""
        />
      </Button>

      <div className="flex flex-col items-center">
        <span className="font-bold">September 26, 2025</span>
        <span>Friday</span>
      </div>
      <Button>
        <img
          src="src\assets\icons\chevron_right_24dp_000000_FILL0_wght200_GRAD0_opsz24.svg"
          alt=""
        />
      </Button>
    </div>
  );
};

export default CalendarHead;
