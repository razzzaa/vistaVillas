import { IoReturnDownBack } from "react-icons/io5";
import Button from "../../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../ui/Heading";

function CheckInData() {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }
  return (
    <div>
      <Button
        buttonContainer={"flex justify-center"}
        text={"BACK"}
        icon={<IoReturnDownBack />}
        style={
          "flex justify-center items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md w-[10%]"
        }
        onClickFunc={handleBack}
      />
    </div>
  );
}

export default CheckInData;
