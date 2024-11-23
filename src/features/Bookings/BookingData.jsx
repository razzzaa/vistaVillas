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
} from "../../utils/dateFunctions";
import { HiHomeModern } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { RiRestaurantFill } from "react-icons/ri";

function BookingData() {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  const { booking } = useBooking(id);
  console.log(booking);

  const { arrivalString, stayString } = calculateStayDetails(
    booking?.startDate,
    booking?.endDate
  );

  return (
    <>
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
      <div className="shadow-xl rounded-md h-[50vh]">
        <div className="text-xl flex items-center justify-between font-medium bg-[var(--color-brand-medium)] rounded-t-md h-[8vh] p-5">
          <div className="flex items-center">
            <div className="p-2">
              <HiHomeModern />
            </div>
            <div className="p-2">
              {stayString} in cabin : {booking?.cabinId}
            </div>
          </div>
          <div>
            {formatDateManual(booking?.startDate)} - {""}
            {formatDateManual(booking?.endDate)}
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-3 w-[70vw] p-4">
            {booking?.bookings_guests.map((guest) => (
              <div
                className="p-2 flex flex-col justify-between"
                key={guest.guests.id}
              >
                <div className="">
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
          <div
            className={`${
              booking?.isPaid ? "bg-green-200" : "bg-red-200"
            } mx-6 py-4 px-8 rounded-md font-bold flex items-center justify-between`}
          >
            <div className="text-3xl">
              <BsCashCoin />
            </div>
            <div> {booking?.isPaid ? "PAID" : "WILL PAY AT PROPERTY"}</div>
          </div>
        </div>
      </div>

      <div className="flex">
        <Button
          buttonContainer={"flex justify-center p-1"}
          text={"BACK"}
          icon={<IoReturnDownBack />}
          style={
            "flex justify-center items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md w-[100%]"
          }
          onClickFunc={handleBack}
        />
        <Button
          buttonContainer={"flex justify-center p-1"}
          text={"DELETE"}
          icon={<RiDeleteBin5Fill />}
          style={
            "flex justify-center items-center my-2 p-2 text-white bg-[var(--color-red-button)] rounded-md font-bold text-md transition-all hover:bg-[var(--color-red-darker)] hover:text-white shadow-md w-[100%]"
          }
          onClickFunc={handleBack}
        />
        {booking?.status === "unconfirmed" ? (
          <Button
            buttonContainer={"flex justify-center p-1"}
            text={"CHECK-IN"}
            icon={<FaUserCheck />}
            style={
              "flex justify-center items-center my-2 p-2 text-white bg-[var(--color-green-button)] rounded-md font-bold text-md transition-all hover:bg-[var(--color-green-darker)] hover:text-white shadow-md w-[100%]"
            }
            onClickFunc={handleBack}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default BookingData;
