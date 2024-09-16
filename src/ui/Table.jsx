import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ children, columns }) {
  console.log(columns);
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
    <div className={`${columns} font-bold text-center border-b px-4 py-2`}>
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
      className={`${columns} justify-center bg-white border-b text-md w-full h-full`}
    >
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
