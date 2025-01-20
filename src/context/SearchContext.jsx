import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [CurSearchValue, setCurSearchValue] = useState("");
  const [CurSearchFields, setCurSearchFields] = useState([]);

  function handleSearchValues(newSearchValue) {
    setCurSearchValue((prevSearchValue) => newSearchValue);
  }

  return (
    <SearchContext.Provider
      value={{
        CurSearchValue,
        CurSearchFields,
        setCurSearchFields,
        setCurSearchValue,
        handleSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearchValues() {
  const { handleSearchValues, CurSearchValue, CurSearchFields } =
    useContext(SearchContext);
  return {
    CurSearchValue,
    CurSearchFields,
    handleSearchValues,
  };
}

export { SearchProvider, useSearchValues };
