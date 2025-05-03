import Form from "../ui/Form";
import Heading from "../ui/Heading";

function Users() {
  return (
    <div>
      <Heading as="h2">Create a new user</Heading>
      <Form schemaType={"register"}>
        <Form.Register style={"bg-white rounded-lg shadow-md p-3"} />
      </Form>
    </div>
  );
}

export default Users;
