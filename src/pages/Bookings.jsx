import BookingTable from "../features/Bookings/BookingTable";
import BookingTableOperations from "../features/Bookings/BookingTableOperations";
import Heading from "../ui/Heading";
BookingTable;

function Bookings() {
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading as="h3">Bookings</Heading>
        <BookingTableOperations />
      </div>
      <BookingTable />
    </>
  );
}

export default Bookings;
