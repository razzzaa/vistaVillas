import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import SpinnerMain from "./Spinner";

function AppLayout() {
  return (
    <div className="layoutContainerGrid ">
      <NavBar />
      <SideBar />
      <main className="col-start-2 col-end-3 bg-background-grey p-6 overflow-auto">
        <div className="mx-28">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
