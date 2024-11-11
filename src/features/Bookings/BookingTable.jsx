import SpinnerMain from "../../ui/Spinner.jsx";
import Table from "../../ui/Table.jsx";
import BookingRow from "./BookingRow.jsx";
import { useBookings } from "./useBookings.js";

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  console.log(bookings);

  if (isLoading) return <SpinnerMain />;

  return (
    <Table columns="grid grid-cols-[1fr_3fr_3fr_2fr_2fr_1fr]">
      <Table.Header>
        <div>CABIN</div>
        <div>GUEST</div>
        <div>DATE</div>
        <div>STATUS</div>
        <div>AMOUNT</div>
        <div></div>
      </Table.Header>
      <Table.Body data={bookings}>
        {bookings?.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default BookingTable;
