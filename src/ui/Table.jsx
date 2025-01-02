import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div role="tableContainer" className="border rounded margin w-auto">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div className={`${columns} font-bold text-center border-b px-1 py-3`}>
      {children}
    </div>
  );
}

function Body({ children, data }) {
  if (!data?.length) return console.log("no data");
  return <section>{children}</section>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className={`${columns} justify-center bg-white border-b text-sm w-full h-full`}
    >
      {children}
    </div>
  );
}

function Footer({ children }) {
  return <div>{children}</div>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
