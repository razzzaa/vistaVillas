import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { RiDeleteBin5Fill } from "react-icons/ri";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";

function CabinRow({ cabin }) {
  const {
    cabin_name,
    description,
    max_capacity,
    price_per_night: price,
    discount,
    availability,
    image,
    id,
  } = cabin;

  return (
    <Table.Row>
      <Modal>
        <Menus>
          <div className="relative h-16 min-w-16">
            <img
              className="rounded-lg aspect-[3/2] p-1 object-cover absolute h-full w-full"
              src={`/cabins/${image}`}
            />
            <div className="absolute w-full h-full p-1">
              <Modal.Open opens={"lrgImg"}>
                <Menus.Button
                  icon={<BiSearchAlt />}
                  styleBox={`flex text-white text-3xl items-center`}
                  styleSpan={"transition-all hover:text-4xl"}
                ></Menus.Button>
              </Modal.Open>
            </div>
          </div>

          <div className="flex justify-center items-center font-bold">
            {cabin_name}
          </div>
          <div className="flex justify-center items-center">{max_capacity}</div>
          <div className="flex justify-center items-center  text-green-600 font-bold">
            ₪{price}
          </div>
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

          <div className="text-2xl flex justify-end items-center p-4">
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Modal.Open>
                <Menus.Button
                  styleBox={
                    "transition-all rounded-lg hover:bg-background-grey"
                  }
                  styleSpan={"flex items-center m-2 p-1"}
                  icon={<RiEdit2Fill />}
                >
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Menus.Button
                styleBox={"transition-all rounded-lg hover:bg-background-grey"}
                styleSpan={"flex items-center m-2 p-1"}
                icon={<HiDocumentDuplicate />}
              >
                Duplicate
              </Menus.Button>
              <Menus.Button
                styleBox={"transition-all rounded-lg hover:bg-background-grey"}
                styleSpan={"flex items-center m-2 p-1"}
                icon={<RiDeleteBin5Fill />}
              >
                Delete
              </Menus.Button>
            </Menus.List>
          </div>

          <Modal.Window name={"lrgImg"}>
            <img className="w-1/2 rounded-md m-1" src={`/cabins/${image}`} />
            <div className="p-4 overflow-y-auto">
              <h1 className="text-xl ">Description:</h1>
              <p>{description}</p>
            </div>
          </Modal.Window>

          <Modal.Window name={"edit"}></Modal.Window>

          <Modal.Window name={"edit"}></Modal.Window>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
