interface ButtonProps {
  style?: string;
  onClick?: () => void;
}

const Button = ({
  style,
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>) => (
  <button className={style + "m-4 rounded-xl border p-2"} onClick={onClick}>
    {children}
  </button>
);

export default Button;
