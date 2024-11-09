import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { RiDeleteBin5Fill } from "react-icons/ri";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Form from "../../ui/Form";
import useAddCabin from "./useAddCabin";
import { MdExpandMore } from "react-icons/md";

function CabinRow({ cabin }) {
  const { addCabins, isUpdating } = useAddCabin();

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

  function handleDuplicate() {
    const { id, ...cabinData } = cabin;

    // addCabins([{ ...cabin, cabin_name: `Copy of ${cabin_name}` }]);
    addCabins({ ...cabinData, cabin_name: `Copy of ${cabin_name}` });
  }

  return (
    <Table.Row>
      <Modal>
        <Menus>
          <div className="relative h-15S min-w-16">
            <img
              className="rounded-lg aspect-[3/2] p-1 object-cover absolute h-full w-full"
              src={`${image}`}
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
          <div className="flex justify-center items-center font-bold">
            ₪{price}
          </div>

          <div
            className={`flex justify-center items-center ${
              discount !== null ? "text-green-600" : ""
            } font-bold`}
          >
            {discount === null ? "---" : `₪${discount}`}
          </div>

          <div className="flex justify-center items-center">
            <div
              className={`w-auto h-auto text-center rounded-lg font-bold text-cyan-950 p-2 truncate text-xs ${
                availability
                  ? "bg-green-200 text-green-700"
                  : "bg-red-300 text-red-800"
              }`}
            >
              {availability ? "Vacant (VAC)" : "Occupied (OCC)"}
            </div>
          </div>

          <div className="flex justify-center items-center text-green-600 font-bold">
            {`₪${discount ? price - Math.abs(discount) : price}`}
          </div>

          <div className="text-2xl flex justify-end items-center p-4">
            <Menus.Toggle icon={<MdExpandMore />} id={id} />
            <Menus.List id={id}>
              <Modal.Open opens={"edit"}>
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
                onClick={handleDuplicate}
              >
                Duplicate
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

          <Modal.Window name={"lrgImg"}>
            <div className="flex">
              <img className="w-1/2 rounded-md m-1" src={`${image}`} />
              <div className="px-4 overflow-auto max-h-[50vh] max-w-[50vw]">
                <h1 className="text-2xl font-bold">Description:</h1>
                <p className="break-words">{description}</p>
              </div>
            </div>
          </Modal.Window>

          <Modal.Window name={"delete"}>
            <ConfirmDelete name={cabin_name} id={id} action={"cab"} />
          </Modal.Window>

          <Modal.Window name={"edit"}>
            <Form schemaType={"cabin"} isEdited={true} duplicateData={cabin}>
              <Form.Cabin
                style={"bg-background-grey rounded-lg p-2"}
                header={"Edit-Cabin"}
              />
            </Form>
          </Modal.Window>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
