import Form from "../../ui/Form.jsx";
import Menus from "../../ui/Menus.jsx";
import Modal from "../../ui/Modal.jsx";
import SpinnerMain from "../../ui/Spinner.jsx";
import Table from "../../ui/Table.jsx";
// import { useCabins } from "../Cabins/useCabins.js";
import BookingRow from "./BookingRow.jsx";
import { useBookings } from "./useBookings.js";
import { RiPlayListAddLine } from "react-icons/ri";

function BookingTable() {
  const { bookings, isPending } = useBookings();
  console.log(bookings);

  if (isPending) return <SpinnerMain />;

  return (
    <Modal>
      <Menus>
        <Table columns="grid grid-cols-[1fr_3fr_3fr_1fr_1fr_1fr]">
          <Table.Header>
            <div>CABIN</div>
            <div>GUESTS</div>
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
        {/* <Modal.Open opens={"addBooking"}>
          <Menus.Button
            styleBox={""}
            styleSpan={
              "flex items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md"
            }
            icon={<RiPlayListAddLine />}
          >
            Create-Booking
          </Menus.Button>
        </Modal.Open>


        <Modal.Window cancelOutsideClick={true} name={"addBooking"}>
          <Form schemaType={"booking"}>
            <Form.Bookings
              style={"bg-background-grey rounded-lg p-1 relative"}
              header={"Create-Booking"}
              bookings={bookings}
              cabins={cabins}
            />
          </Form>
        </Modal.Window> */}
      </Menus>
    </Modal>
  );
}

export default BookingTable;
