import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

function BookingRow({ booking }) {
  console.log(booking);

  const {
    id,
    created_at,
    startDate,
    endDate,
    numGuests,
    numNights,
    observation,
    status,
    extraPrice,
    hasBreakfast,
    cabins,
    bookings_guests,
  } = booking;

  console.log(bookings_guests);

  return (
    <Table.Row>
      <Modal>
        <Menus>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
