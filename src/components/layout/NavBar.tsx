import tempIcon from "../../assets/icons/temp_icon.svg";
import { Link, useLocation } from "wouter";

interface NavItemProps {
  label: string;
  iconURL: string;
  href: string;
  isActive?: boolean;
}

export const NavItem = ({
  label,
  iconURL,
  href,
  isActive = false,
}: NavItemProps) => {
  const activeClasses: string = isActive
    ? "relative before:absolute before:-inset-2 before:-inset-x-6 before:rounded-4xl before:border"
    : "";

  const textClasses: string = isActive ? "font-semibold" : "";
  return (
    <li>
      <Link
        href={href}
        className="flex flex-col items-center justify-center p-4"
      >
        <div className={activeClasses + " mb-2"}>
          <img src={iconURL} />
        </div>
        <span className={textClasses}>{label}</span>
      </Link>
    </li>
  );
};

const NavItems: NavItemProps[] = [
  {
    label: "Home",
    iconURL: tempIcon,
    href: "/home",
  },
  {
    label: "Journal",
    iconURL: tempIcon,
    href: "/journal",
  },
  {
    label: "Report",
    iconURL: tempIcon,
    href: "/report",
  },
  {
    label: "Menu",
    iconURL: tempIcon,
    href: "/menu",
  },
];

export const NavBar = () => {
  const [location] = useLocation();

  return (
    <nav className="h-18 w-full border-t border-t-black">
      <ul className="flex justify-around">
        {NavItems.map((item) => (
          <NavItem
            label={item.label}
            iconURL={item.iconURL}
            href={item.href}
            isActive={location.includes(item.href)}
          ></NavItem>
        ))}
      </ul>
    </nav>
  );
};
