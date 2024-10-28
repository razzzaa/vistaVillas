import { useState } from "react";
import useDeleteCabin from "../features/Cabins/useDeleteCabin";
import Heading from "./Heading";

function ConfirmDelete({ id, cabinName, onCloseModal }) {
  const { delCab, isUpdating } = useDeleteCabin();

  return (
    <div className="w-[25vw] m-5">
      <Heading as="h3">Delete?</Heading>
      <div className="font-bold text-lg text-red-800">
        Are you sure you want to delete {cabinName}, This action cannot be
        undone.
      </div>
      <div className="flex w-full justify-end">
        <button
          onClick={onCloseModal}
          className="bg-white mx-1 px-6 py-2 rounded-md border border-slate-200 transition-all hover:scale-[1.02]"
        >
          NO
        </button>
        <button
          onClick={() => delCab(id)}
          className="bg-red-800 text-white mx-1 px-6 py-2 rounded-md border transition-all border-slate-200 hover:scale-[1.02]"
        >
          YES
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
