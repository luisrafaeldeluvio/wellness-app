import tempIcon from "./temp_icon.svg";
import { useState } from "react";

interface NavItemProps {
  label: string;
  iconURL: string;
  isActive?: boolean;
  onClick?: any;
}

export const NavItem = ({
  label,
  iconURL,
  isActive = false,
  onClick,
}: NavItemProps) => {
  const activeNavItem: string = isActive
    ? "relative before:absolute before:-inset-2 before:-inset-x-6 before:rounded-4xl before:border-1"
    : "";

  return (
    <li
      onClick={() => onClick(label)}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className={activeNavItem + " mb-2"}>
        <img src={iconURL} />
      </div>
      <span>{label}</span>
    </li>
  );
};

const NavItems: NavItemProps[] = [
  { label: "Home", iconURL: tempIcon },
  { label: "Log", iconURL: tempIcon },
  { label: "Report", iconURL: tempIcon },
  { label: "Menu", iconURL: tempIcon },
];

export const NavBar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const handleItemClick = (tabName: string) => setActiveTab(tabName);

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t border-t-black">
      <ul className="flex justify-around">
        {NavItems.map((item) => (
          <NavItem
            label={item.label}
            iconURL={item.iconURL}
            isActive={activeTab === item.label}
            onClick={handleItemClick}
          ></NavItem>
        ))}
      </ul>
    </nav>
  );
};
