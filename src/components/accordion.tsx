import React, { useState } from "react";

interface accordionProp {
  text: string;
  style?: string;
}

const Accordion = ({
  text,
  style,
  children,
}: React.PropsWithChildren<accordionProp>) => {
  const [show, setshow] = useState<boolean>(false);

  return (
    <div className={style + (show ? " rounded-4xl border p-4" : "")}>
      <button
        className={
          "flex w-full flex-row items-center justify-between " +
          (show ? "" : "rounded-4xl border p-4")
        }
        type="button"
        onClick={() => {
          setshow(!show);
        }}
      >
        <p>{text}</p>
      </button>

      <div
        className={
          "grid overflow-hidden transition-[grid-template-rows] duration-300 " +
          (show ? " grid-rows-[1fr]" : "grid-rows-[0fr]")
        }
      >
        <div className="min-h-0">{show ? children : null}</div>
      </div>
    </div>
  );
};

export default Accordion;
