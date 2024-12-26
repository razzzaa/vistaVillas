import { IoCloseCircleSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import Heading from "./Heading";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      console.log(`Opening modal: ${opensWindowName}`);
      open(opensWindowName);
    },
  });
}

function Window({ children, name, cancelOutsideClick = false }) {
  const { close, openName } = useContext(ModalContext);

  const ref = useRef(null);

  useOutsideClick(close, true, ref);

  console.log(cancelOutsideClick);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 flex-auto backdrop-blur z-50">
      <div
        ref={cancelOutsideClick ? null : ref}
        className="flex flex-col items-end justify-between fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] border-1 rounded-md border-white bg-background-grey shadow-xl p-3"
      >
        <button className="flex p-1 text-2xl transition-all hover:scale-110">
          <MdOutlineClose className="h-full" onClick={close} />
        </button>
        <div className="flex flex-col items-center h-full">
          {children && cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
