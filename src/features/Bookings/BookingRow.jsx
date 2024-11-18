import { useEffect, useRef, useState } from "react";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatCurrency";

function BookingRow({ booking }) {
  const [expandedGuests, setExpandedGuests] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  //DATE
  //................................................................................................................................................................................
  const formatDateManual = (dateString) => {
    const date = new Date(dateString);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[date.getDay()];
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${day} ${month}/${dayOfMonth}/${year}`;
  };

  const calculateStayDetails = (arrivalDateString, departureDateString) => {
    const currentDate = new Date(); // Current date
    const arrivalDate = new Date(arrivalDateString); // Guest's arrival date
    const departureDate = new Date(departureDateString); // Guest's departure date

    // Calculate time until arrival
    const timeUntilArrival = arrivalDate - currentDate; // Difference in milliseconds

    const daysUntilArrival = Math.ceil(timeUntilArrival / 86400000); // Convert ms to days

    // Calculate stay duration
    const stayDuration = Math.ceil((departureDate - arrivalDate) / 86400000); // Convert ms to days

    // Convert time until arrival to years, months, and days
    const yearsUntilArrival = Math.floor(daysUntilArrival / 365);

    const remainingDaysAfterYears = daysUntilArrival % 365;

    const monthsUntilArrival = Math.floor(remainingDaysAfterYears / 30);

    const daysAfterMonths = remainingDaysAfterYears % 30;

    // Build arrival time string
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
    hasBreakfast,
    cabins,
    bookings_guests,
  } = booking;

  function handleCheckOverflow() {
    if (contentRef.current) {
      const element = contentRef.current;
      const isContentOverflowing =
        element.scrollHeight > element.offsetHeight ||
        element.scrollWidth > element.offsetWidth;
      setIsOverflowing(isContentOverflowing);
    }
  }

  function handleShowMore() {
    setExpandedGuests((prev) => !prev);
    setIsOverflowing((prev) => !prev);
  }

  calculateStayDetails(startDate, endDate);

  useEffect(() => {
    handleCheckOverflow();

    const handleResize = () => {
      handleCheckOverflow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [bookings_guests, expandedGuests]);

  //AMOUNT
  //................................................................................................................................................................................
  const finalPrice = cabins.discount
    ? cabins.price_per_night +
      (hasBreakfast && 125) +
      extraPrice -
      Math.abs(cabins.discount)
    : cabins.price_per_night + (hasBreakfast && 125) + extraPrice;

  //................................................................................................................................................................................

  return (
    <Table.Row>
      <Modal>
        <Menus>
          <div className="flex justify-center items-center font-bold p-2">
            {cabins.cabin_name}
          </div>
          <div className="truncate">
            <div className="flex justify-start" ref={contentRef}>
              <div
                className={
                  expandedGuests ? "grid grid-cols-2" : "flex flex-row"
                }
              >
                {bookings_guests?.map((guest) => (
                  <div
                    className="text-start p-2 break-words"
                    key={guest.guests.id}
                  >
                    <div className="font-bold text-wrap">
                      {guest.guests.fullName}
                    </div>

                    <div className="font-extralight text-wrap">
                      {guest.guests.email}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isOverflowing && (
              <div className="flex justify-center w-[100%] pb-1">
                <button
                  onClick={handleShowMore}
                  className="text-blue-500 text-sm mt-1"
                >
                  Show More...
                </button>
              </div>
            )}

            {!isOverflowing && expandedGuests && (
              <div className="flex justify-center w-[100%] pb-1">
                <button
                  onClick={handleShowMore}
                  className="text-blue-500 text-sm mt-1"
                >
                  Show Less...
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center flex-col p-2 justify-center">
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
