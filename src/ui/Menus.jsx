import { createContext } from "react";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPositions] = useState(null);

  return (
    <MenusContext.Provider value={(openId, close, open)}>
      {children}
    </MenusContext.Provider>
  );
}

function Button({ children, image, icon }) {
  return (
    <div>
      <button>{icon}</button>
      <span>{children}</span>
    </div>
  );
}

Menus.Button = Button;

export default Menus;
