import GuestsTable from "../features/Guests/GuestsTable";
import GuestsTableOperations from "../features/Guests/GuestsTableOperations";
import Heading from "../ui/Heading";

function Guests() {
  return (
    <>
      <div className="flex justify-between items-center pb-2">
        <Heading as="h2">Guests</Heading>
        <GuestsTableOperations />
      </div>
      <div>
        <GuestsTable />
      </div>
    </>
  );
}

export default Guests;
