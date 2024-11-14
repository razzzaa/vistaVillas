import { useEffect, useRef, useState } from "react";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

function BookingRow({ booking }) {
  console.log(booking);
  const [expandedGuests, setExpandedGuests] = useState({});
  const [overflowGuests, setOverflowGuests] = useState({});

  const nameRefs = useRef({});
  const emailRefs = useRef({});

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

  useEffect(() => {
    const checkOverflow = () => {
      const newOverflowGuests = {};
      bookings_guests.forEach((guest) => {
        const guestId = guest.guests.id;
        const nameRef = nameRefs.current[guestId];
        const emailRef = emailRefs.current[guestId];

        if (nameRef && emailRef) {
          const isNameOverflowing = nameRef.scrollWidth > nameRef.clientWidth;
          const isEmailOverflowing =
            emailRef.scrollWidth > emailRef.clientWidth;
          newOverflowGuests[guestId] = isNameOverflowing || isEmailOverflowing;
        }
      });
      setOverflowGuests(newOverflowGuests);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [bookings_guests]);

  console.log(bookings_guests);

  function handleToggleExpand(guestId) {
    setExpandedGuests((prev) => ({
      ...prev,
      [guestId]: !prev[guestId],
    }));
  }

  return (
    <Table.Row>
      <Modal>
        <Menus>
          <div className="flex justify-center items-center font-bold">
            {cabins.cabin_name}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {bookings_guests?.map((guest) => (
              <div className="text-center py-2" key={guest.guests.id}>
                <div
                  className={`font-bold ${
                    expandedGuests[guest.guests.id] ? "" : "truncate"
                  }`}
                  ref={(el) => (nameRefs.current[guest.guests.id] = el)}
                >
                  {guest.guests.fullName}
                </div>

                <div
                  className={`font-extralight ${
                    expandedGuests[guest.guests.id]
                      ? "overflow-auto"
                      : "truncate"
                  }`}
                  ref={(el) => (emailRefs.current[guest.guests.id] = el)}
                >
                  {guest.guests.email}
                </div>

                {overflowGuests[guest.guests.id] && (
                  <button
                    onClick={() => handleToggleExpand(guest.guests.id)}
                    className="text-blue-500 text-sm mt-1"
                  >
                    {expandedGuests[guest.guests.id]
                      ? "Show Less"
                      : "Show More"}
                  </button>
                )}
              </div>
            ))}
          </div>
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
