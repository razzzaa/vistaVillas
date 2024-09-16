import Logo from "./Logo";
import MainSideBarNav from "./MainSideBarNav";

function SideBar() {
  return (
    <aside className="row-start-1 row-end-2 h-lvh border-[1px]">
      <Logo />
      <MainSideBarNav />
    </aside>
  );
}

export default SideBar;
