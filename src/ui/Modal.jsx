import { IoCloseCircleSharp } from "react-icons/io5";
import { cloneElement, createContext, useContext, useState } from "react";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");
  console.log(openName);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
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
