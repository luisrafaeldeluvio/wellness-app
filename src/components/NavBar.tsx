import tempIcon from "./temp_icon.svg";

interface NavItemProps {
  label: string;
  iconURL: string;
  isActive?: boolean;
}

export const NavItem = ({ label, iconURL, isActive = false }: NavItemProps) => {
  const activeNavItem: string = isActive
    ? "relative before:absolute before:-inset-2 before:-inset-x-6 before:rounded-4xl before:border-1"
    : ""; //use a state not a prop
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={activeNavItem + " mb-2"}>
        <img src={iconURL} />
      </div>
      <span>{label}</span>
    </div>
  );
};

const NavItems: NavItemProps[] = [
  { label: "Home", iconURL: tempIcon, isActive: true },
  { label: "Log", iconURL: tempIcon },
  { label: "Report", iconURL: tempIcon },
  { label: "Menu", iconURL: tempIcon },
];

export const NavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full border-t border-t-black">
      <ul className="flex justify-around">
        {NavItems.map((item) => (
          <li>
            <NavItem
              label={item.label}
              iconURL={item.iconURL}
              isActive={item.isActive}
            ></NavItem>
          </li>
        ))}
      </ul>
    </nav>
  );
};
