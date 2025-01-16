import { NavLink } from "react-router-dom";
import { IoCalendar } from "react-icons/io5";
import { FaHouseChimney } from "react-icons/fa6";
import { HiHomeModern } from "react-icons/hi2";
import { HiMiniUsers } from "react-icons/hi2";
import { LuSettings2 } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";

function MainSideBarNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink to="/home" className="styledNavLinkSideBar">
            <FaHouseChimney />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className="styledNavLinkSideBar">
            <IoCalendar />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabins" className="styledNavLinkSideBar">
            <HiHomeModern />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/guests" className="styledNavLinkSideBar">
            <FaPeopleGroup />
            <span>Guests</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="styledNavLinkSideBar">
            <HiMiniUsers />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="styledNavLinkSideBar">
            <LuSettings2 />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainSideBarNav;
