import { useEffect, useRef, useState } from "react";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatCurrency";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { MdCloseFullscreen } from "react-icons/md";

function BookingRow({ booking }) {
  const [expandedGuests, setExpandedGuests] = useState(false);
  console.log(expandedGuests);
  const contentRef = useRef(null);

  //DATE
  //................................................................................................................................................................................
  const formatDateManual = (dateString) => {
    const date = new Date(dateString);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[date.getDay()];
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${day} ${month}/${dayOfMonth}/${year}`;
  };

  const calculateStayDetails = (arrivalDateString, departureDateString) => {
    const currentDate = new Date();
    const arrivalDate = new Date(arrivalDateString);
    const departureDate = new Date(departureDateString);

    const timeUntilArrival = arrivalDate - currentDate;

    const daysUntilArrival = Math.ceil(timeUntilArrival / 86400000);

    const stayDuration = Math.ceil((departureDate - arrivalDate) / 86400000);

    const yearsUntilArrival = Math.floor(daysUntilArrival / 365);

    const remainingDaysAfterYears = daysUntilArrival % 365;

    const monthsUntilArrival = Math.floor(remainingDaysAfterYears / 30);

    const daysAfterMonths = remainingDaysAfterYears % 30;

    let arrivalString = "In ";
    if (yearsUntilArrival > 0) arrivalString += `${yearsUntilArrival} year(s) `;
    if (monthsUntilArrival > 0)
      arrivalString += `${monthsUntilArrival} month(s) `;
    if (daysAfterMonths > 0 || (!yearsUntilArrival && !monthsUntilArrival)) {
      arrivalString += `${daysAfterMonths} day(s) `;
    }
    if (daysAfterMonths > 0 || (!yearsUntilArrival && !monthsUntilArrival)) {
      arrivalString += `${daysAfterMonths} day(s) `;
    }

    const stayString = `${stayDuration} night stay`;

    return (
      <div className="flex items-center">
        <div className="px-2">{arrivalString}</div>
        <FaLongArrowAltRight />
        <div className="px-2">{stayString}</div>
      </div>
    );
  };

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
    cabins,
    bookings_guests,
  } = booking;

  console.log(bookings_guests);

  calculateStayDetails(startDate, endDate);

  //AMOUNT
  //................................................................................................................................................................................
  //   const finalPrice = cabins.discount
  //     ? cabins.price_per_night +
  //       (hasBreakfast && 125 * numGuests) +
  //       extraPrice -
  //       Math.abs(cabins.discount)
  //     : cabins.price_per_night + (hasBreakfast && 125) + extraPrice;
  const finalPrice =
    bookings_guests.length > 1
      ? cabins.discount
        ? cabins.price_per_night +
          extraPrice -
          Math.abs(cabins.discount) +
          125 * bookings_guests.filter((guest) => guest.hasBreakfast).length
        : cabins.price_per_night +
          extraPrice +
          125 * bookings_guests.filter((guest) => guest.hasBreakfast).length
      : cabins.discount
      ? cabins.price_per_night +
        extraPrice -
        Math.abs(cabins.discount) +
        (bookings_guests[0].hasBreakfast && 125)
      : cabins.price_per_night +
        extraPrice +
        (bookings_guests[0].hasBreakfast && 125);

  function handleExpandedGuest() {
    setExpandedGuests((exp) => !exp);
  }

  //................................................................................................................................................................................

  return (
    <Table.Row>
      <Modal>
        <Menus>
          <div className="flex justify-center items-center font-bold p-2">
            {cabins.cabin_name}
          </div>
          <div
            className={`${
              expandedGuests ? "grid grid-cols-2" : "flex"
            } items-center justify-around nth-child-2`}
            ref={contentRef}
          >
            {expandedGuests ? (
              bookings_guests.map((guest) => (
                <div
                  className="text-start p-2 break-words"
                  key={guest.guests.id}
                >
                  <div className="font-bold text-wrap">
                    {guest.guests.fullName}
                  </div>

                  <div className="font-extralight text-wrap ">
                    {guest.guests.email}
                  </div>
                </div>
              ))
            ) : (
              <div
                className="text-start p-2 break-words"
                key={bookings_guests[0].guests.id}
              >
                <div className="font-bold text-wrap">
                  {bookings_guests[0].guests.fullName}
                </div>

                <div className="font-extralight text-wrap ">
                  {bookings_guests[0].guests.email}
                </div>
              </div>
            )}

            {bookings_guests.length > 1 ? (
              expandedGuests ? (
                <button onClick={() => handleExpandedGuest()} className="">
                  <MdCloseFullscreen />
                </button>
              ) : (
                <button
                  onClick={() => handleExpandedGuest()}
                  className="flex h-[100%] pt-3"
                >
                  <BsArrowsAngleExpand />
                </button>
              )
            ) : (
              <div></div>
            )}
          </div>

          {/* {isOverflowing && (
              <div className="flex justify-center w-[100%] pb-1">
                <button
                  onClick={handleShowMore}
                  className="text-blue-500 text-sm"
                >
                  Show More...
                </button>
              </div>
            )}

            {!isOverflowing && expandedGuests && (
              <div className="flex justify-center w-[100%] pb-1">
                <button
                  onClick={handleShowMore}
                  className="text-blue-500 text-sm"
                >
                  Show Less...
                </button>
              </div>
            )} */}
          <div className="flex items-start flex-col p-2 justify-center">
            <div> {calculateStayDetails(startDate, endDate)}</div>
            <div className="font-extralight text-wrap flex items-center text-xs">
              <div className="p-2">{formatDateManual(startDate)}</div>
              {<FaLongArrowAltRight />}
              <div className="p-2">{formatDateManual(endDate)}</div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div
              className={`w-auto h-auto text-center rounded-lg font-bold text-cyan-950 p-2 truncate text-xs ${
                status === "confirmed" && "bg-green-200 text-green-700"
              } ${status === "unconfirmed" && "bg-red-300 text-red-800"} ${
                status === "checked_out" && "bg-stone-300"
              }`}
            >
              {status === "unconfirmed" && "unconfirmed"}
              {status === "confirmed" && "checked-in"}
              {status === "checked_out" && "checked-out"}
            </div>
          </div>
          <div className="flex justify-center items-center font-bold">
            {formatCurrency(finalPrice)}
          </div>
          <div></div>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
