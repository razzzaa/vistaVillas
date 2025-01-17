import { createContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState();

  function handleSearch(e) {
    setSearchValue(() => e.target.value);
  }
  return (
    <SearchContext>
      <div className="flex bg-white  m-2 rounded-l-md rounded-r-md border items-center ">
        <input
          className="p-3 rounded-lg"
          type="text"
          placeholder="Search..."
          onChange={handleSearch()}
        />
        {children}
      </div>
    </SearchContext>
  );
}

export default SearchProvider;
