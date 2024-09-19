import { createContext, useContext, useState } from "react";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Button({ children, icon, id, onClick }) {
  const { openId, close, open, position, setPosition } =
    useContext(MenusContext);

  function handleClick(e) {
    onClick?.();
    close?.();
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
    console.log(openId);
    console.log(rect);
  }

  return (
    <>
      <button onClick={handleClick}>
        {icon}
        {children ? <span>{children}</span> : ""}
      </button>
    </>
  );
}

Menus.Button = Button;

export default Menus;
