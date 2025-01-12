import CabinTable from "../features/Cabins/CabinTable";
import CabinTableOperations from "../features/Cabins/CabinTableOperations";
import Heading from "../ui/Heading";

function Cabins() {
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading as="h2">All Cabins</Heading>
        <CabinTableOperations />
      </div>

      <div>
        <CabinTable />
      </div>
    </>
  );
}

export default Cabins;
