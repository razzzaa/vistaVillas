import GuestsTable from "../features/Guests/GuestsTable";
import Heading from "../ui/Heading";

function Guests() {
  return (
    <div>
      <Heading as="h3">Guests</Heading>
      <GuestsTable />
    </div>
  );
}

export default Guests;
