import UpdatePassword from "../features/authentication/UpdatePassword";
import UpdateUserData from "../features/authentication/UpdateUserData";
import Heading from "../ui/Heading";

function Account() {
  return (
    <>
      <div>
        <Heading className="py-5" as="h2">
          Update your account
        </Heading>
      </div>

      <div>
        <Heading as="h3">
          Update user data :
          <UpdateUserData />
        </Heading>
      </div>

      <div>
        <Heading as="h3">
          Update password :
          <UpdatePassword />
        </Heading>
      </div>
    </>
  );
}

export default Account;
