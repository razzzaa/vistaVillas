import Button from "../ui/Button";
import Form from "../ui/Form";
import Heading from "../ui/Heading";
import { BsFillFloppy2Fill } from "react-icons/bs";

function Settings() {
  return (
    <Form>
      <Heading as="h3">Settings</Heading>
      <div className="bg-white rounded-lg shadow-md p-3">
        <Form.Settings />
      </div>
      <Button
        text={"Save"}
        icon={<BsFillFloppy2Fill />}
        style={
          "flex items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md"
        }
      />
    </Form>
  );
}

export default Settings;
Settings;
