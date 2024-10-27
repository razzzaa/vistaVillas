import { useState } from "react";
import useDeleteCabin from "../features/Cabins/useDeleteCabin";

function ConfirmDelete({ id, cabinName, onCloseModal }) {
  const { delCab, isUpdating } = useDeleteCabin();

  return (
    <>
      <div className="font-bold text-lg text-red-800">
        Are you sure you want to delete cabin {cabinName}?
      </div>
      <div className="flex w-full justify-around py-4">
        <button
          onClick={onCloseModal}
          className="bg-white px-5 py-1 rounded-md border border-slate-500 transition-all hover:scale-[1.02] font-bold"
        >
          NO
        </button>
        <button
          onClick={() => delCab(id)}
          className="bg-light-yellow px-5 py-1 rounded-md border transition-all border-slate-500 hover:scale-[1.02] font-bold"
        >
          YES
        </button>
      </div>
    </>
  );
}

export default ConfirmDelete;
