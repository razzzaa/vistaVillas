import BookingTable from "../features/Bookings/BookingTable";
import Heading from "../ui/Heading";
BookingTable;

function Bookings() {
  return (
    <div>
      <Heading as="h3">Bookings</Heading>
      <BookingTable />
    </div>
  );
}

export default Bookings;
