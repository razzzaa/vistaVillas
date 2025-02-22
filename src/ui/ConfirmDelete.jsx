import { useState } from "react";
import Heading from "./Heading";
import useDeleteCabin from "../features/cabins/useDeleteCabin";
import useDeleteGuests from "../features/Guests/useDeleteGuests";
import useDeleteBooking from "../features/bookings/useDeleteBooking";
import { useNavigate } from "react-router-dom";

function ConfirmDelete({ id, name, onCloseModal, action }) {
  const { delCab } = useDeleteCabin();
  const { delGuest } = useDeleteGuests();
  const { delBook } = useDeleteBooking();
  const navigate = useNavigate();

  function handleDelBook() {
    navigate(-1);
    delBook(id);
  }

  console.log("got to confirm delete");

  return (
    <div className="w-[25vw] m-5">
      <Heading as="h3">Delete?</Heading>
      <div className="font-bold text-lg text-red-800">
        Are you sure you want to delete {name}, This action cannot be undone.
      </div>
      <div className="flex w-full justify-end">
        <button
          onClick={onCloseModal}
          className="bg-white mx-1 px-6 py-2 rounded-md border border-slate-200 transition-all hover:scale-[1.02]"
        >
          NO
        </button>
        <button
          onClick={() => {
            action === "cab" && delCab(id);
            action === "guest" && delGuest(id);
            action === "book" && handleDelBook();
          }}
          className="bg-red-800 text-white mx-1 px-6 py-2 rounded-md border transition-all border-slate-200 hover:scale-[1.02]"
        >
          YES
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
