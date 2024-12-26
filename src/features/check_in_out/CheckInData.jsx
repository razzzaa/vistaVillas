import { IoReturnDownBack } from "react-icons/io5";
import Button from "../../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../ui/Heading";
import BookingData from "../Bookings/BookingData";
import { FaUserCheck } from "react-icons/fa";
import Table from "../../ui/Table";
import { useEffect, useState } from "react";
import useCheckInOut from "./useCheckin";

function CheckInData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Control animation
  const { check, isPending, error } = useCheckInOut();

  function handleCheckboxChange(event) {
    setIsPressed(event.target.checked);
  }

  function handleCheckIn() {
    check({ status: "confirmed", id });
    navigate("/bookings");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div>
      <BookingData hide={true} />
      <div
        className={`mt-5 transform transition-all duration-500 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="flex p-5 text-lg">
          <div>
            Please confirm that the customer has fully paid and is ready for
            check-in:
          </div>

          <div className="flex pl-3">
            <input
              className="mr-2 w-5"
              type="checkbox"
              id="confirm"
              name="confirm"
              onChange={handleCheckboxChange}
              checked={isPressed}
            />
            <label htmlFor="confirm">Confirm</label>
          </div>
        </div>
      </div>
      <div className="flex">
        <Button
          buttonContainer={"flex justify-center p-1"}
          text={"BACK"}
          icon={<IoReturnDownBack />}
          style={`flex justify-center items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md w-[100%] ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
          onClick={() => navigate("/bookings")}
        />

        <Button
          isPressed={isPressed}
          buttonContainer={"flex justify-center p-1"}
          text={"CHECK-IN"}
          icon={<FaUserCheck />}
          style={`flex justify-center items-center my-2 p-2 text-white ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          } ${
            isPressed
              ? "hover:bg-[var(--color-green-darker)] bg-[var(--color-green-button)]"
              : "bg-gray-300"
          } rounded-md font-bold text-md transition-all  hover:text-white shadow-md w-[100%]`}
          onClick={handleCheckIn}
        />
      </div>
    </div>
  );
}

export default CheckInData;
