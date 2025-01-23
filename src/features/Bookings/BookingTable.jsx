import { useSearchParams } from "react-router-dom";
import Form from "../../ui/Form.jsx";
import Menus from "../../ui/Menus.jsx";
import Modal from "../../ui/Modal.jsx";
import SpinnerMain from "../../ui/Spinner.jsx";
import Table from "../../ui/Table.jsx";
import BookingRow from "./BookingRow.jsx";
import { useBookings } from "./useBookings.js";
import { RiPlayListAddLine } from "react-icons/ri";
import Pagination from "../../ui/Pagination.jsx";
import { useAllBookings } from "./useAllBookings.js";
import { useCabinsAll } from "../cabins/useCabinsAll.js";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  const { cabinsAll } = useCabinsAll();
  const [searchParams] = useSearchParams();
  const { allBookings } = useAllBookings();

  if (isLoading) return <SpinnerMain />;

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
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
        <Modal.Open opens={"addBooking"}>
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
              style={"bg-background-grey rounded-lg p-1"}
              header={"Create-Booking"}
              bookings={allBookings}
              cabins={cabinsAll}
            />
          </Form>
        </Modal.Window>
      </Menus>
    </Modal>
  );
}

export default BookingTable;

//CLIENT-SIDE FILTER AND SORTBY
//FILTER
//.....................................................................................................................................................
//   const filterdValues = searchParams.get("booking") || "all";
//   console.log(filterdValues);
//   console.log(bookings);

//   let filteredData;
//   if (filterdValues === "all") {
//     filteredData = bookings;
//   }
//   if (filterdValues === "confirmed") {
//     filteredData = bookings.filter((booking) => booking.status === "confirmed");
//   }
//   if (filterdValues === "unconfirmed") {
//     filteredData = bookings.filter(
//       (booking) => booking.status === "unconfirmed"
//     );
//   }
//   if (filterdValues === "checked_out") {
//     filteredData = bookings.filter(
//       (booking) => booking.status === "checked_out"
//     );
//   }
//.....................................................................................................................................................

//SORT
//.....................................................................................................................................................
//   const sortBy = searchParams.get("sortBy") || "startDate-asc";
//   const [field, direction] = sortBy.split("-");
//   console.log(filteredData);

//   const modifier = direction === "asc" ? 1 : -1;
//   const sortedBookings = filteredData.sort((a, b) => {
//     const valA = a[field];
//     const valB = b[field];

//     // If the field is a date (e.g., "startDate"), convert the strings to Date objects
//     if (field === "startDate") {
//       const dateA = new Date(valA);
//       const dateB = new Date(valB);

//       // Compare Date objects
//       return (dateA - dateB) * modifier;
//     }
//   });

//.....................................................................................................................................................
