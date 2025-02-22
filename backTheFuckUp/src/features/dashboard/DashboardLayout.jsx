import styled from "styled-components";
import SpinnerMain from "../../ui/Spinner";
import { useCabins } from "../Cabins/useCabins";
import SalesChart from "./SalesChart";
import Stats from "./stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading2 } = useRecentBookings();
  const {
    isLoading: isLoading1,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  console.log(cabins);

  if (isLoading2 || isLoading1 || isLoading3) return <SpinnerMain />;

  return (
    <>
      <StyledDashboardLayout>
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabins?.length}
        />
      </StyledDashboardLayout>
      <div className="flex justify-between pt-4">
        <div className="grow-[1]">
          <DurationChart confirmedStays={confirmedStays} />
        </div>
        <div className="grow-[1.5]">
          <SalesChart bookings={bookings} numDays={numDays} />
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
