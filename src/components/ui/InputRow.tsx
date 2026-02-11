export interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  label: string;
  unit?: string;
  inputClassName?: string;
}

const InputRow = ({
  containerClassName,
  label,
  unit,
  inputClassName,
  type,
  name,
  id,
  ...attr
}: LabeledInputProps) => {
  return (
    <div
      className={`my-8 flex flex-row items-center justify-between ${containerClassName}`}
    >
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          className={`w-16 text-right ${inputClassName}`}
          type={type}
          name={name}
          id={id}
          {...attr}
        />
        {unit}
      </div>
    </div>
  );
};

export default InputRow;
