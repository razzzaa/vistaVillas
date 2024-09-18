import { IoCloseCircleSharp } from "react-icons/io5";
import { createContext, useState } from "react";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  return <ModalContext.Provider>{children}</ModalContext.Provider>;
}

function Header({ title, id }) {
  return (
    <div>
      <button>
        <IoCloseCircleSharp />
      </button>
      <h2>{title}</h2>
    </div>
  );
}

export default Modal;
