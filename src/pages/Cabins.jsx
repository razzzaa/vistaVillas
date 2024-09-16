import CabinTable from "../features/Cabins/CabinTable";
import Heading from "../ui/Heading";

function Cabins() {
  return (
    <>
      <div>
        <Heading as="h3">All Cabins</Heading>
        <CabinTable />
      </div>
      <div></div>
    </>
  );
}

export default Cabins;
