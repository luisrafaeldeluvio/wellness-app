interface ButtonProps {
  onClick?: () => void;
}

const Button = ({
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>) => (
  <button onClick={onClick}>{children}</button>
);

export default Button;
