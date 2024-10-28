import { getGuests } from "../../services/apiGuests";

function GuestsTable() {
  getGuests();

  return <div></div>;
}

export default GuestsTable;
