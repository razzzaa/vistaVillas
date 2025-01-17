import ConfirmDelete from "../../ui/ConfirmDelete";
import Form from "../../ui/Form";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { HiDotsVertical } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";

function GuestsRow({ guest, index }) {
  const { id, fullName, email, nationalId, countryFlag, country } = guest;

  const countryForEdit = countryFlag + ` : ` + country;

  return (
    <Table.Row>
      <Modal>
        <Menus>
          <div className="flex justify-center items-center p-1 font-medium ">
            #{index}
          </div>
          <div className="flex justify-center items-center p-1">{fullName}</div>
          <div className="flex justify-center items-center p-1">{email}</div>
          <div className="flex justify-center items-center p-1">
            {nationalId}
          </div>
          <div className="flex justify-center items-center p-1">{country}</div>
          <div className="flex justify-center items-center p-1">
            <img src={`https://flagsapi.com/${countryFlag}/shiny/24.png/`} />
          </div>
          <div className="flex justify-center">
            <Menus.Toggle id={id} icon={<HiDotsVertical />} />
            <Menus.List id={id}>
              <Modal.Open opens={"edit"}>
                <Menus.Button
                  styleBox={
                    "transition-all rounded-lg hover:bg-background-grey"
                  }
                  styleSpan={"flex items-center m-2 p-1"}
                  icon={<RiEdit2Fill />}
                >
                  Edit
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens={"delete"}>
                <Menus.Button
                  styleBox={
                    "transition-all rounded-lg hover:bg-background-grey"
                  }
                  styleSpan={"flex items-center m-2 p-1"}
                  icon={<TiUserDelete />}
                >
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </div>

          <Modal.Window name={"edit"}>
            <Form
              isEdited={true}
              duplicateData={{ ...guest, country: countryForEdit }}
              schemaType={"guests"}
            >
              <Form.Guests header={"Edit-Guest"} />
            </Form>
          </Modal.Window>

          <Modal.Window name={"delete"}>
            <ConfirmDelete name={fullName} id={id} action="guest" />
          </Modal.Window>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default GuestsRow;
