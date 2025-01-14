import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashBoard/DashboardLayout";
import Heading from "../ui/Heading";

function Home() {
  return (
    <asd>
      <div className="flex items-center justify-between mb-2">
        <Heading as="h2">Home-Panel</Heading>
        <DashboardFilter />
      </div>
      <div>
        <DashboardLayout />
      </div>
    </asd>
  );
}

export default Home;
