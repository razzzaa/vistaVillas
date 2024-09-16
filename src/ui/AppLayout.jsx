import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function AppLayout() {
  return (
    <div className="layoutContainerGrid">
      <NavBar />
      <SideBar />
      <main className="col-start-2 col-end-3 bg-background-grey p-8">
        <div className="mx-28">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
