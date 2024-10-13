import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdExpandMore } from "react-icons/md";
import useOutsideClick from "../hooks/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition, position } =
    useContext(MenusContext) || {};

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 2,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  console.log(openId);
  return (
    <button
      onClick={handleClick}
      className="transition-all focus:rotate-180 hover:text-dark-yellow"
    >
      <MdExpandMore />
    </button>
  );
}

function List({ id, children }) {
  const { position, openId, close } = useContext(MenusContext);
  const { x, y } = position || {};
  const ref = useRef(null);
  useOutsideClick(close, true, ref);
  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      className="shadow-xl bg-white rounded-md p-2"
      style={{
        position: "fixed",
        top: y ? `${y}px` : "0",
        right: x ? `${x}px` : "0",
      }}
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick, styleBox, styleSpan }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li className={styleBox}>
      <button onClick={handleClick}>
        <span className={styleSpan}>
          <div>{icon}</div>
          <div className="px-2">{children ? children : ""}</div>
        </span>
      </button>
    </li>
  );
}

Menus.Button = Button;
Menus.Toggle = Toggle;
Menus.List = List;

export default Menus;
