import { MdDarkMode } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RiUserSettingsFill } from "react-icons/ri";

import Logout from "../features/authentication/Logout";

function NavBarMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex gap-5 pr-6 items-center text-xl p-2">
      <li className="flex">
        <button
          onClick={() => navigate("/accounts")}
          className="styledNavLButtonHeader"
        >
          <RiUserSettingsFill />
        </button>
      </li>
      <li className="flex">
        <button className="styledNavLButtonHeader">
          <MdDarkMode />
        </button>
      </li>
      <li className="flex">
        <Logout />
      </li>
    </ul>
  );
}

export default NavBarMenu;
