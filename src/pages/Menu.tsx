import { useLocation } from "wouter";
import Button from "../components/ui/Button";
import { Header } from "../components/ui/Header";

const Menu = () => {
  const [, setLocation] = useLocation();
  return (
    <>
      <Header>Menu</Header>
      <div>
        <Button onClick={() => setLocation("/profile")}>Profile</Button>
      </div>
    </>
  );
};
export default Menu;
