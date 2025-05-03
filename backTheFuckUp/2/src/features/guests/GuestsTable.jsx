import { useEffect } from "react";
import { useSearchValues } from "../../context/SearchContext";
import Form from "../../ui/Form";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Pagination from "../../ui/Pagination";
import SpinnerMain from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestsRow from "./GuestsRow";
import { useGuests } from "./useGetGuests";
import { RiPlayListAddLine } from "react-icons/ri";

function GuestsTable() {
  const { guests, isLoading, error, count, PAGE_SIZE } = useGuests();
  //   const { CurSearchValue } = useSearchValues();
  console.log(PAGE_SIZE);

  if (isLoading) return <SpinnerMain />;

  //   let guestsData;
  //   guestsData = guests;

  //   if (CurSearchValue) {
  //     guestsData = guests.filter(
  //       (guest) =>
  //         guest.fullName.toLowerCase().includes(CurSearchValue.toLowerCase()) &&
  //         guest.email.toLowerCase().includes(CurSearchValue.toLowerCase())
  //     );
  //   }

  return (
    <div>
      <Menus>
        <Modal>
          <Table columns="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_0.3fr_0.3fr] text-md">
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
              {guests.map((guest, index) => (
                <GuestsRow guest={guest} key={guest.id} index={index + 1} />
              ))}
            </Table.Body>
            <Table.Footer>
              <Pagination count={count} pageSize={PAGE_SIZE} />
            </Table.Footer>
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
