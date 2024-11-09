import Form from "../../ui/Form";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import SpinnerMain from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestsRow from "./GuestsRow";
import { useGuests } from "./useGetGuests";
import { RiPlayListAddLine } from "react-icons/ri";

function GuestsTable() {
  const { guests, isPending, error } = useGuests();
  console.log(guests);

  if (isPending) return <SpinnerMain />;

  return (
    <div>
      <Menus>
        <Modal>
          <Table columns="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_0.3fr_0.3fr]">
            <Table.Header>
              <div></div>
              <div>Full-Name</div>
              <div>Email</div>
              <div>National-ID</div>
              <div>Country</div>
              <div></div>
              <div></div>
            </Table.Header>
            <Table.Body data={guests}>
              {guests?.map((guest, index) => (
                <GuestsRow guest={guest} key={guest.id} index={index + 1} />
              ))}
            </Table.Body>
          </Table>
          <Modal.Open opens={"addGuest"}>
            <Menus.Button
              styleBox={""}
              styleSpan={
                "flex items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md"
              }
              icon={<RiPlayListAddLine />}
            >
              Add-Guest
            </Menus.Button>
          </Modal.Open>

          <Modal.Window name={"addGuest"}>
            <Form schemaType={"guests"}>
              <Form.Guests
                style={"bg-background-grey rounded-lg p-1"}
                header={"Add-Guests"}
              />
            </Form>
          </Modal.Window>
        </Modal>
      </Menus>
    </div>
  );
}

export default GuestsTable;
