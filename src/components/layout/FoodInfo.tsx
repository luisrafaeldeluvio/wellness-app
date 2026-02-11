import InputRow from "../ui/InputRow";

interface FoodInfoProps {
  disabledInputs?: (NutrimentId | GeneralId)[] | boolean;
  defaultValue?: Partial<Record<NutrimentId | GeneralId, string>>;
}

type NutrimentId = (typeof nutrimentsInput)[number]["id"];

type GeneralId = (typeof generalInput)[number]["id"];

const nutrimentsInput = [
  {
    label: "Energy",
    id: "energy-kcal_100g",
    unit: "kcal",
    attr: {
      required: true,
    },
  },
  {
    label: "Proteins",
    id: "proteins_100g",
    unit: "g",
    attr: {
      required: false,
    },
  },
  {
    label: "Carbohydrates",
    id: "carbohydrates_100g",
    unit: "g",
    attr: {
      required: false,
    },
  },
  {
    label: "Total Fat",
    id: "fat_100g",
    unit: "g",
    attr: {
      required: false,
    },
  },
  {
    label: "Sugars",
    id: "sugars_100g",
    unit: "g",
    attr: {
      required: false,
    },
  },
  {
    label: "Saturated Fat",
    id: "saturated-fat_100g",
    unit: "g",
    attr: {
      required: false,
    },
  },
  {
    label: "Fiber",
    id: "fiber_100g",
    unit: "g",
    attr: {
      required: false,
    },
  },
  {
    label: "Sodium",
    id: "sodium_100g",
    unit: "g",
    attr: {
      required: false,
    },
  },
] as const;

const generalInput = [
  {
    label: "Date",
    id: "date",
    type: "date",
    unit: "",
    attr: {
      inputClassName: "w-32",
      containerClassName: "mt-0!",
    },
  },
  {
    label: "Name",
    id: "name",
    type: "text",
    unit: "",
    attr: {
      inputClassName: "w-32",
      containerClassName: "",
    },
  },
  {
    label: "Serving Size",
    id: "serving_size",
    type: "text",
    unit: "",
    attr: {
      inputClassName: "w-32",
      containerClassName: "",
    },
  },
  {
    label: "Consumed",
    id: "consumed_g",
    type: "number",
    unit: "g",
    attr: {
      inputClassName: "",
      containerClassName: "",
    },
  },
] as const;

const FoodInfo = ({ disabledInputs, defaultValue }: FoodInfoProps) => {
  const isInputDisabled = (id: NutrimentId | GeneralId) => {
    if (!disabledInputs) return undefined;

    if (typeof disabledInputs === "boolean") {
      return disabledInputs;
    } else {
      return disabledInputs.includes(id);
    }
  };

  return (
    <>
      <fieldset>
        {generalInput.map(({ label, id, type, attr }) => (
          <InputRow
            label={label}
            type={type}
            name={id}
            value={defaultValue?.[id]}
            id={id}
            required
            readOnly={isInputDisabled(id)}
            {...attr}
          />
        ))}
      </fieldset>

      <fieldset>
        {nutrimentsInput.map(({ label, id, unit, attr }) => (
          <InputRow
            label={label}
            type="number"
            name={id}
            value={defaultValue?.[id]}
            id={id}
            unit={unit}
            readOnly={isInputDisabled(id)}
            {...attr}
          />
        ))}
      </fieldset>
    </>
  );
};

export default FoodInfo;
