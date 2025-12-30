import tempIcon from "../assets/icons/temp_icon.svg";
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
  return (
    <li>
      <Link href={href}>
        <div>
          <img src={iconURL} />
        </div>
        <span>{label}</span>
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
    <nav>
      <ul>
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
