import NavBarAvatar from "./NavBarAvatar";
import NavBarMenu from "./NavBarMenu";

function NavBar() {
  return (
    <header className="flex justify-end border-[1px]">
      <NavBarAvatar />
      <NavBarMenu />
    </header>
  );
}

export default NavBar;
