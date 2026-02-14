import { useLocation } from "wouter";
import Button from "./Button";

export const Header = ({ children }: React.PropsWithChildren) => {
  return <h1 className="m-4 text-2xl font-bold">{children}</h1>;
};

interface PageHeaderProp {
  headerText: string;
  location?: string;
}

export const PageHeader = ({ headerText, location }: PageHeaderProp) => {
  const [, setLocation] = useLocation();
  return (
    <div className="flex flex-row items-center">
      <Button
        onClick={() =>
          location ? setLocation(location) : window.history.back()
        }
        style="mr-0"
      >
        Back
      </Button>
      <Header>{headerText}</Header>
    </div>
  );
};
