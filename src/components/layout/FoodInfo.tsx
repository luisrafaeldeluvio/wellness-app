import InputRow, { type LabeledInputProps } from "../ui/InputRow";

interface FoodInfoProps {
  disabledInputs?: (NutrimentIds | GeneralIds)[] | boolean;
  hiddenInputs?: (NutrimentIds | GeneralIds)[] | boolean;
  defaultValue?: Partial<Record<NutrimentIds | GeneralIds, string>>;
}

type NutrimentIds = (typeof NUTRIMENT_FIELDS)[number]["id"];

type GeneralIds = (typeof GENERAL_FIELDS)[number]["id"];

const NUTRIMENT_FIELDS = [
  {
    label: "Energy",
    id: "energy-kcal_100g",
    unit: "kcal",
    required: true,
  },
  {
    label: "Proteins",
    id: "proteins_100g",
    unit: "g",
    required: false,
  },
  {
    label: "Carbohydrates",
    id: "carbohydrates_100g",
    unit: "g",
    required: false,
  },
  {
    label: "Total Fat",
    id: "fat_100g",
    unit: "g",
    required: false,
  },
  {
    label: "Sugars",
    id: "sugars_100g",
    unit: "g",
    required: false,
  },
  {
    label: "Saturated Fat",
    id: "saturated-fat_100g",
    unit: "g",
    required: false,
  },
  {
    label: "Fiber",
    id: "fiber_100g",
    unit: "g",
    required: false,
  },
  {
    label: "Sodium",
    id: "sodium_100g",
    unit: "g",
    required: false,
  },
] as const satisfies LabeledInputProps[];

const GENERAL_FIELDS = [
  {
    label: "Date",
    id: "date",
    type: "date",
    inputClassName: "w-32",
    containerClassName: "mt-0!",
  },
  {
    label: "Name",
    id: "name",
    type: "text",
    inputClassName: "w-32",
  },
  {
    label: "Serving Size",
    id: "serving_size",
    type: "text",
    inputClassName: "w-32",
  },
  {
    label: "Consumed",
    id: "consumed_g",
    type: "number",
    unit: "g",
  },
] as const satisfies LabeledInputProps[];

const FoodInfo = ({
  disabledInputs,
  hiddenInputs,
  defaultValue,
}: FoodInfoProps) => {
  const isInputDisabled = (id: NutrimentIds | GeneralIds) => {
    if (!disabledInputs) return undefined;

    if (typeof disabledInputs === "boolean") {
      return disabledInputs;
    } else {
      return disabledInputs.includes(id);
    }
  };

  const isInputHidden = (id: NutrimentIds | GeneralIds) => {
    if (!hiddenInputs) return undefined;

    if (typeof hiddenInputs === "boolean") {
      return hiddenInputs;
    } else {
      return hiddenInputs.includes(id);
    }
  };

  return (
    <>
      <fieldset>
        {GENERAL_FIELDS.map((attr) => (
          <InputRow
            {...attr}
            type={isInputHidden(attr.id) ? "hidden" : ""}
            defaultValue={defaultValue?.[attr.id]}
            readOnly={isInputDisabled(attr.id)}
            required
          />
        ))}
      </fieldset>

      <fieldset>
        {NUTRIMENT_FIELDS.map((attr) => (
          <InputRow
            type={isInputHidden(attr.id) ? "hidden" : "number"}
            defaultValue={defaultValue?.[attr.id]}
            readOnly={isInputDisabled(attr.id)}
            {...attr}
          />
        ))}
      </fieldset>
    </>
  );
};

export default FoodInfo;
