import { useState } from "react";
import Table from "../../ui/Table";
import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import { RiPlayListAddLine } from "react-icons/ri";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  return (
    <Modal>
      <Menus>
        <Table columns="grid grid-cols-[1fr_1fr_2fr_1fr_2fr_2fr_1fr]">
          <Table.Header>
            <div></div>
            <div>CABIN</div>
            <div>CAPACITY</div>
            <div>PRICE</div>
            <div>DISCOUNT</div>
            <div>AVAILABILITY</div>
            <div></div>
          </Table.Header>
          <Table.Body data={cabins}>
            {cabins?.map((cabin) => (
              <CabinRow key={cabin.id} cabin={cabin} />
            ))}
          </Table.Body>
        </Table>
        <Modal.Open opens={"addCabin"}>
          <Menus.Button
            styleBox={""}
            styleSpan={
              "flex items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md"
            }
            icon={<RiPlayListAddLine />}
          >
            Add-Cabin
          </Menus.Button>
        </Modal.Open>
        <Form>
          <Modal.Window name={"addCabin"}>
            <Form.Cabin />
          </Modal.Window>
        </Form>
      </Menus>
    </Modal>
  );
}

export default CabinTable;
