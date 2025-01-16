import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function AppLayout() {
  return (
    <div className="layoutContainerGrid ">
      <NavBar />
      <SideBar />
      <main className="grid justify-center col-start-2 col-end-3 bg-background-grey p-6 overflow-auto">
        <div className="w-[70vw]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
