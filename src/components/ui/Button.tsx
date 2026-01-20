interface ButtonProps {
  style?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button = ({
  style,
  onClick,
  children,
  type,
}: React.PropsWithChildren<ButtonProps>) => (
  <button
    type={type}
    className={style + " m-4 rounded-xl border p-2"}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
