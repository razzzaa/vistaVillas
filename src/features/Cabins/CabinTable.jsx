import Table from "../../ui/Table";
import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import { RiPlayListAddLine } from "react-icons/ri";
import Modal from "../../ui/Modal";
import Form from "../../ui/Form";
import SpinnerMain from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function CabinTable() {
  const { cabins, isLoading, count } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <SpinnerMain />;

  // const filterValue = searchParams.get("discount-availability") || "all";

  // let filteredValue;
  // if (filterValue === "all") {
  //   filteredValue = cabins;
  //   console.log(filteredValue);
  // }
  // if (filterValue === "no-discount") {
  //   filteredValue = cabins.filter((cabin) => cabin.discount === null);
  //   console.log(filteredValue);
  // }
  // if (filterValue === "with-discount") {
  //   filteredValue = cabins.filter((cabin) => cabin.discount > 0);
  //   console.log(filteredValue);
  // }
  // if (filterValue === "available") {
  //   filteredValue = cabins.filter((cabin) => cabin.availability === true);
  //   console.log(filteredValue);
  // }

  //   SORT
  //.................................................................................................................................
  // const sortBy = searchParams.get("sortBy") || "cabin_name-asc";
  // const [field, direction] = sortBy.split("-");

  // //   const sortedCabins = filteredValue.sort(
  // //     (a, b) => (a[field] - b[field]) * modifier
  // //   );

  // const modifier = direction === "asc" ? 1 : -1;

  // const sortedCabins = cabins.sort((a, b) => {
  //   // Case 1: If sorting by a numeric field (like price_per_night or max_capacity)
  //   if (typeof a[field] === "number" && typeof b[field] === "number") {
  //     return (a[field] - b[field]) * modifier;
  //   }

  //   // Case 2: If sorting by a string field (like cabin_name)
  //   if (typeof a[field] === "string" && typeof b[field] === "string") {
  //     if (field === "cabin_name") {
  //       // Sorting by the first letter of the cabin_name
  //       const firstCharA = a[field].charAt(0).toLowerCase();
  //       const firstCharB = b[field].charAt(0).toLowerCase();
  //       return firstCharA.localeCompare(firstCharB) * modifier;
  //     }

  //     // Default string comparison for other fields (if needed)
  //     return a[field].localeCompare(b[field]) * modifier;
  //   }

  //   // Default case: fallback for unknown types or cases
  //   return 0;
  // });

  return (
    <Modal>
      <Menus>
        <Table columns="grid grid-cols-[0.8fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
          <Table.Header>
            <div></div>
            <div>CABIN</div>
            <div>CAPACITY</div>
            <div>PRICE</div>
            <div>DISCOUNT</div>
            <div>AVAILABILITY</div>
            <div>TOTAL</div>
            <div></div>
          </Table.Header>
          <Table.Body data={cabins}>
            {cabins?.map((cabin) => (
              <CabinRow key={cabin.id} cabin={cabin} />
            ))}
          </Table.Body>
        </Table>
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
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

        <Modal.Window name={"addCabin"}>
          <Form schemaType={"cabin"}>
            <Form.Cabin
              style={"bg-background-grey rounded-lg p-1"}
              header={"Add-Cabin"}
            />
          </Form>
        </Modal.Window>
      </Menus>
    </Modal>
  );
}

export default CabinTable;
