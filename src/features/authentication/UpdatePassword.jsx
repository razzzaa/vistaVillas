import Form from "../../ui/Form";

function UpdatePassword() {
  return (
    <Form schemaType="updateUserPassword">
      <Form.UpdateUserPassword style={"bg-white rounded-lg shadow-md p-3"} />
    </Form>
  );
}

export default UpdatePassword;
