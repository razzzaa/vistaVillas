import { useUser } from "../features/authentication/useUser";

function NavBarAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;
  console.log(user);
  console.log(avatar);

  return (
    <>
      <div className="flex items-center text-gray-500">
        <div className="w-12">
          {avatar === "" && <img src="/logos/default-user.jpg" />}
          <div className="">
            {avatar !== "" && (
              <img
                className=" outline outline-offset-2 rounded-full object-cover object-center outline-gray-200 aspect-square"
                src={avatar}
                alt=""
              />
            )}
          </div>
        </div>
        <span className="pl-2 pr-5 font-bold">{fullName}</span>
      </div>
    </>
  );
}

export default NavBarAvatar;
