import { IoLogOut } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function NavBarMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex gap-5 pr-6 items-center text-xl">
      <li>
        <button
          onClick={() => navigate("/users")}
          className="styledNavLButtonHeader"
        >
          <RiUser3Fill />
        </button>
      </li>
      <li>
        <button className="styledNavLButtonHeader">
          <MdDarkMode />
        </button>
      </li>
      <li>
        <button className="styledNavLButtonHeader">
          <IoLogOut />
        </button>
      </li>
    </ul>
  );
}

export default NavBarMenu;
