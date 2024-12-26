import { useNavigate } from "react-router-dom";

function Button({
  icon,
  text,
  style,
  buttonContainer,
  onClick,
  isPressed = true,
}) {
  console.log("got to the button");
  return (
    <div onClick={onClick} className={buttonContainer}>
      <button disabled={!isPressed} className={style}>
        <span>{icon}</span>
        <span className={text ? "px-2" : "px-0"}>{text ? text : ""}</span>
      </button>
    </div>
  );
}

export default Button;
