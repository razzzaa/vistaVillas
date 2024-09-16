import NavBarAvatar from "./NavBarAvatar";
import NavBarMenu from "./NavBarMenu";

function NavBar() {
  return (
    <header className="flex justify-end border-[1px] col-start-2 col-end-3">
      <NavBarMenu />
      <NavBarAvatar />
    </header>
  );
}

export default NavBar;
