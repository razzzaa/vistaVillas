import { IoCloseCircleSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";

import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

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
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);
  const ref = useRef(null);
  useOutsideClick(close, true, ref);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur z-50">
      <div
        ref={ref}
        className="flex fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] border-2 rounded-md border-white bg-background-grey shadow-xl max-h-[50vh]"
      >
        <button className="text-2xl transition-all hover:scale-110">
          <TbArrowBackUp className="h-full" onClick={close} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
