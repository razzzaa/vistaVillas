import Button from "../ui/Button";
import Form from "../ui/Form";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <>
      <Heading as="h3">Settings</Heading>
      <Form schemaType={"settings"}>
        <Form.Settings style={"bg-white rounded-lg shadow-md p-3"} />
      </Form>
    </>
  );
}

export default Settings;
Settings;
