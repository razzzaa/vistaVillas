import { useState } from "react";
import Table from "../../ui/Table";
import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  console.log(cabins);

  return (
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
  );
}

export default CabinTable;
