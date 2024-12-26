import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { IoReturnDownBack } from "react-icons/io5";
import { useBooking } from "./useBooking";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";
import {
  calculateStayDetails,
  formatDateManual,
  StayDurationCalc,
} from "../../utils/dateFunctions";
import { HiHomeModern } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { RiRestaurantFill } from "react-icons/ri";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  FinalPrice,
  NumGuestsWithBreakfast,
} from "../../utils/priceCalculator";
import useSettings from "../Settings/useSettings";
import SpinnerMain from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { FaExpandAlt } from "react-icons/fa";
import { TiInfo } from "react-icons/ti";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { MdGroupRemove } from "react-icons/md";
import useCheckInOut from "../check_in_out/useCheckin";

function BookingData({ hide }) {
  const { id } = useParams();
  const [expandedGuests, setExpandedGuests] = useState(false);
  const [hideBookingBtns, setHideBookingBtns] = useState(false);
  const { settings } = useSettings();
  const { booking, isPending, error } = useBooking(id);
  const navigate = useNavigate();
  const { check } = useCheckInOut();

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    setHideBookingBtns(hide);
  }, [hide]);

  function handleExpandedGuest() {
    setExpandedGuests((exp) => !exp);
  }

  function handleCheckOut() {
    check({ status: "checked_out", id });
    navigate("/bookings");
  }

  if (isPending) return <SpinnerMain />;

  const { arrivalString, stayString } = calculateStayDetails(
    booking?.startDate,
    booking?.endDate
  );

  const stayDuration = StayDurationCalc(booking?.startDate, booking?.endDate);

  const finalPrice = FinalPrice(
    booking?.bookings_guests.length,
    booking?.cabins.discount,
    booking?.cabins.price_per_night,
    booking?.extraPrice,
    settings?.breakfastPrice,
    stayDuration,
    booking?.bookings_guests
  );

  return (
    <Modal>
      <div className="flex justify-between items-center">
        <Heading as="h3">Booking #{id}</Heading>
        <div
          className={`w-auto h-auto text-center rounded-lg font-bold text-cyan-950 p-2 truncate text-xs ${
            booking?.status === "confirmed" && "bg-green-200 text-green-700"
          } ${booking?.status === "unconfirmed" && "bg-red-300 text-red-800"} ${
            booking?.status === "checked_out" && "bg-stone-300"
          }`}
        >
          {booking?.status === "unconfirmed" && "unconfirmed"}
          {booking?.status === "confirmed" && "checked-in"}
          {booking?.status === "checked_out" && "checked-out"}
        </div>
      </div>
      <div className="flex flex-col shadow-xl rounded-md ">
        <div className="text-xl flex items-center justify-between font-medium bg-[var(--color-brand-medium)] rounded-t-md h-[8vh] p-5">
          <div className="flex items-center">
            <div className="p-2">
              <HiHomeModern />
            </div>
            <div className="p-2">
              {stayString} in cabin : #
              {String(booking?.cabins.cabin_name).padStart(3, "0")}
            </div>
          </div>
          <div>
            {formatDateManual(booking?.startDate)} - {""}
            {formatDateManual(booking?.endDate)}
          </div>
        </div>
        <div className="flex flex-col justify-around flex-grow pb-6">
          <div className="grid grid-cols-3 w-[70vw] p-4">
            {booking?.bookings_guests.map((guest) => (
              <div className="p-2 flex flex-col" key={guest.guests.id}>
                <div>
                  <div className="flex items-center">
                    <div className="font-bold">{guest.guests.fullName}</div>
                    <BsDot />
                    <div className="text-sm">{guest.guests.nationalId}</div>
                    <BsDot />
                  </div>
                  <div className="flex items-center break-all font-light text-sm">
                    <div className="pr-2">
                      <MdEmail />
                    </div>
                    <div>{guest.guests.email}</div>
                  </div>
                  {guest.hasBreakfast ? (
                    <div className="flex items-center break-all font-light text-sm">
                      <div className="pr-2">
                        <RiRestaurantFill />
                      </div>
                      <div>Breakfast-Included</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex">
                  <img
                    src={`https://flagsapi.com/${guest.guests.countryFlag}/shiny/24.png/`}
                  />
                  <div className="font-extralight pl-2">
                    {guest.guests.country}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {booking.observation && (
            <div className="px-6 py-2 flex items-center">
              <div className="pr-3 text-xl">
                <TiInfo />
              </div>
              <div>Observations : {booking.observation}</div>
            </div>
          )}

          <div
            className={`${
              booking?.isPaid ? "bg-green-200" : "bg-red-200"
            } mx-6 py-4 px-8 rounded-md font-bold ${
              expandedGuests
                ? "grid items-center justify-items-start grid-cols-1"
                : "flex items-center justify-between"
            } `}
          >
            <div className="flex items-center ">
              <div className="text-3xl pr-3">
                <BsCashCoin />
              </div>
              {expandedGuests ? (
                <div className="grid grid-rows-6">
                  {booking?.extraPrice && (
                    <div className="flex font-normal">
                      <header className="font-bold pr-1">Extra Fees:</header>
                      Extra fees at checkout, including cabin damages, shipping,
                      handling charges, and taxes .For more information, please
                      inquire at the reception.
                      <div className="font-bold pl-2">
                        ({formatCurrency(booking.extraPrice)})
                      </div>
                    </div>
                  )}
                  {booking?.numGuests > 1 && (
                    <div className=" flex font-normal">
                      <header className="font-bold pr-1">Breakfast:</header>
                      Number of guests with breakfast :{" "}
                      {NumGuestsWithBreakfast(booking.bookings_guests)} *
                      Breakfast price :{" "}
                      {formatCurrency(settings?.breakfastPrice)} * Stay duration
                      : {stayDuration} day(s).
                      <div className="font-bold pl-2">
                        {formatCurrency(
                          NumGuestsWithBreakfast(booking.bookings_guests) *
                            settings?.breakfastPrice *
                            stayDuration
                        )}
                      </div>
                    </div>
                  )}
                  {
                    <div className="flex font-normal">
                      <header className="font-bold pr-1">Cabin-Price:</header>
                      Cabin price per-night:{" "}
                      {formatCurrency(booking?.cabins.price_per_night)} * Stay
                      duration: {stayDuration} day(s).
                      <div className="pl-2 font-bold">
                        {formatCurrency(
                          booking?.cabins.price_per_night * stayDuration
                        )}
                      </div>
                    </div>
                  }
                  {booking?.cabins.discount && (
                    <div className="flex font-normal">
                      <header className="font-bold pr-1">Discount:</header>
                      Cabin discount:{" "}
                      {formatCurrency(booking?.cabins.discount * stayDuration)}.
                      <div className="pl-2 font-bold">
                        {formatCurrency(
                          booking?.cabins.discount * stayDuration
                        )}
                      </div>
                    </div>
                  )}
                  <div className="px-1 font-extrabold underline decoration-double	">
                    {formatCurrency(finalPrice)}
                  </div>
                </div>
              ) : (
                <div className="flex">
                  {booking?.extraPrice &&
                    `Extra-Fees: (${formatCurrency(booking.extraPrice)}) `}
                  {booking?.numGuests > 1 &&
                    ` + Breakfast: (${formatCurrency(
                      NumGuestsWithBreakfast(booking.bookings_guests) *
                        settings?.breakfastPrice *
                        stayDuration
                    )})`}
                  {` + Cabin-Price: (${formatCurrency(
                    booking?.cabins.price_per_night * stayDuration
                  )})`}
                  {booking?.cabins.discount &&
                    ` - Discount: (${formatCurrency(
                      booking?.cabins.discount * stayDuration
                    )})`}{" "}
                  =
                  <div className="px-1 font-extrabold underline decoration-double">
                    {formatCurrency(finalPrice)}
                  </div>
                </div>
              )}

              <button onClick={() => handleExpandedGuest()} className="p-1">
                <FaExpandAlt />
              </button>
            </div>

            {expandedGuests ? (
              ""
            ) : (
              <div> {booking?.isPaid ? "PAID" : "WILL PAY AT PROPERTY"}</div>
            )}
          </div>
        </div>
      </div>

      {!hideBookingBtns && (
        <div className="flex">
          <Button
            buttonContainer={"flex justify-center p-1"}
            text={"BACK"}
            icon={<IoReturnDownBack />}
            style={
              "flex justify-center items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md w-[100%]"
            }
            onClick={handleBack}
          />
          {booking?.status === "confirmed" ? (
            <Button
              buttonContainer={"flex justify-center p-1"}
              text={"CHECK-OUT"}
              icon={<MdGroupRemove />}
              style={
                "flex justify-center items-center my-2 p-2 text-white bg-[var(--color-red-button)] rounded-md font-bold text-md transition-all hover:bg-[var(--color-red-darker)] hover:text-white shadow-md w-[100%]"
              }
              onClick={handleCheckOut}
            />
          ) : (
            <Modal.Open opens={"delete"}>
              <Button
                buttonContainer={"flex justify-center p-1"}
                text={"DELETE"}
                icon={<RiDeleteBin5Fill />}
                style={
                  "flex justify-center items-center my-2 p-2 text-white bg-[var(--color-red-button)] rounded-md font-bold text-md transition-all hover:bg-[var(--color-red-darker)] hover:text-white shadow-md w-[100%]"
                }
              />
            </Modal.Open>
          )}
          {booking?.status === "unconfirmed" ? (
            <Button
              buttonContainer={"flex justify-center p-1"}
              text={"GO TO CHECK-IN"}
              style={
                "flex justify-center items-center my-2 p-2 text-white bg-[var(--color-green-button)] rounded-md font-bold text-md transition-all hover:bg-[var(--color-green-darker)] hover:text-white shadow-md w-[100%]"
              }
              onClick={() => navigate(`/checkin/${booking?.id}`)}
            />
          ) : (
            ""
          )}
        </div>
      )}

      <Modal.Window name={"delete"}>
        <ConfirmDelete
          name={`Booking num #${booking.id}`}
          id={booking.id}
          action={"book"}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingData;
