import { useState } from "react";
import Table from "../../ui/Table";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import ImgModal from "../../ui/ImgModal";

function CabinRow({ cabin }) {
  const {
    cabin_name,
    description,
    max_capacity,
    price_per_night: price,
    discount,
    availability,
    image,
  } = cabin;

  console.log(discount);
  return (
    <Table.Row>
      <div className="relative h-16 min-w-16">
        <img
          className="rounded-lg aspect-[3/2] p-1 object-cover absolute h-full w-full"
          src={`/cabins/${image}`}
        />
        <div className="absolute w-full h-full p-1">
          <button className="z-50" onClick={() => alert("nahui")}>
            <HiMagnifyingGlassPlus className="text-white text-xl hover:m-1 hover:scale-150 transition-all" />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center font-bold">
        {cabin_name}
      </div>
      <div className="flex justify-center items-center">{max_capacity}</div>
      <div className="flex justify-center items-center">{price}</div>
      <div className="flex justify-center items-center text-green-600 font-bold">
        {discount === null ? "---" : `₪${discount}`}
      </div>
      <div className="flex justify-center items-center">
        <div
          className={`w-auto h-auto text-center rounded-xl font-bold text-cyan-950 p-2 truncate text-xs ${
            availability
              ? "bg-green-200 text-green-700"
              : "bg-red-300 text-red-800"
          }`}
        >
          {availability ? "Vacant (VAC)" : "Occupied (OCC)"}
        </div>
      </div>
    </Table.Row>
  );
}

export default CabinRow;