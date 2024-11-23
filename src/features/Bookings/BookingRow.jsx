import { useRef, useState } from "react";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/formatCurrency";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { VscFold } from "react-icons/vsc";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import useSettings from "../Settings/useSettings";
import {
  formatDateManual,
  calculateStayDetails,
} from "../../utils/dateFunctions";
import { FaLongArrowAltRight } from "react-icons/fa";
import priceCalculator from "../../utils/priceCalculator";

function BookingRow({ booking }) {
  const [expandedGuests, setExpandedGuests] = useState(false);
  const contentRef = useRef(null);
  const { settings } = useSettings();

  //DATE
  //................................................................................................................................................................................

  const {
    id,
    startDate,
    endDate,
    status,
    extraPrice,
    cabins,
    bookings_guests,
  } = booking;

  const { arrivalString, stayString } = calculateStayDetails(
    startDate,
    endDate
  );

  console.log(arrivalString);
  console.log(stayString);

  //CALCULATE NIGHTS STAY FOR PRICE
  //..............................................................................................................................................................................
  const arrivalDate = new Date(startDate);
  const departureDate = new Date(endDate);
  const stayDuration = Math.ceil((departureDate - arrivalDate) / 86400000);

  priceCalculator(
    bookings_guests.length,
    cabins.discount,
    cabins.price_per_night,
    extraPrice,
    settings?.breakfastPrice,
    stayDuration,
    bookings_guests
  );

  const finalPrice =
    bookings_guests.length > 1
      ? cabins.discount
        ? cabins.price_per_night +
          extraPrice -
          Math.abs(cabins.discount) +
          settings?.breakfastPrice *
            stayDuration *
            bookings_guests.filter((guest) => guest.hasBreakfast).length
        : cabins.price_per_night +
          extraPrice +
          settings?.breakfastPrice *
            stayDuration *
            bookings_guests.filter((guest) => guest.hasBreakfast).length
      : cabins.discount
      ? cabins.price_per_night +
        extraPrice -
        Math.abs(cabins.discount) +
        (bookings_guests[0].hasBreakfast &&
          settings?.breakfastPrice * stayDuration)
      : cabins.price_per_night +
        extraPrice +
        (bookings_guests[0].hasBreakfast &&
          settings?.breakfastPrice * stayDuration);

  function handleExpandedGuest() {
    setExpandedGuests((exp) => !exp);
  }

  const navigate = useNavigate();

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
            <div className="grid col-span-2 items-end justify-center">
              {bookings_guests.length > 1 ? (
                expandedGuests ? (
                  <button
                    onClick={() => handleExpandedGuest()}
                    className="p-2 text-lg"
                  >
                    <div></div>
                    <VscFold />
                  </button>
                ) : (
                  <button
                    onClick={() => handleExpandedGuest()}
                    className="h-[100%] pt-3"
                  >
                    <BsArrowsAngleExpand />
                  </button>
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="flex items-start flex-col p-2 justify-center">
            <div>
              <div className="flex items-center">
                <div className="px-2">{arrivalString}</div>
                <FaLongArrowAltRight />
                <div className="px-2">{stayString}</div>
              </div>
            </div>
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

          <div className="text-2xl flex justify-end items-center p-4">
            <Menus.Toggle
              id={id}
              icon={<PiDotsThreeVerticalBold />}
              effect={"transition-all hover:text-dark-yellow"}
            />
            <Menus.List id={id}>
              <Menus.Button
                styleBox={"transition-all rounded-lg hover:bg-background-grey"}
                styleSpan={"flex items-center m-2 p-1"}
                icon={<FaPlusCircle />}
                onClick={() => navigate(`/bookings/${id}`)}
              >
                Show All Details
              </Menus.Button>
              <Menus.Button
                styleBox={"transition-all rounded-lg hover:bg-background-grey"}
                styleSpan={"flex items-center m-2 p-1"}
                icon={<FaUserCheck />}
                onClick={() => navigate(`/checkin/${id}`)}
              >
                Check-In
              </Menus.Button>

              <Modal.Open opens={"delete"}>
                <Menus.Button
                  styleBox={
                    "transition-all rounded-lg hover:bg-background-grey"
                  }
                  styleSpan={"flex items-center m-2 p-1"}
                  icon={<RiDeleteBin5Fill />}
                >
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </div>

          <Modal.Window name={"delete"}>
            <ConfirmDelete
              name={`Booking num #${id}`}
              id={id}
              action={"book"}
            />
          </Modal.Window>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
