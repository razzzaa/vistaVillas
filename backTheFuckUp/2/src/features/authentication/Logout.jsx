import { IoLogOut } from "react-icons/io5";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <button
      disabled={isLoading}
      onClick={() => logout()}
      className="styledNavLButtonHeader"
    >
      <IoLogOut />
    </button>
  );
}

export default Logout;
