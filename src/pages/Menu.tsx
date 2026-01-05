import { useLocation } from "wouter";
import Button from "../components/Button";
import Header from "../components/Header";

const Menu = () => {
  const [, setLocation] = useLocation();
  return (
    <>
      <Header>Menu</Header>
      <div>
        <Button onClick={() => setLocation("/Profile")}>Profile</Button>
      </div>
    </>
  );
};
export default Menu;
