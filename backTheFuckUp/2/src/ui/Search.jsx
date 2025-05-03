import { useEffect, useState } from "react";
import { useSearchValues } from "../context/SearchContext";

function Search() {
  const [searchValue, setSearchValue] = useState("");

  const { CurSearchValue, handleSearchValues } = useSearchValues();

  function handleSearch(e) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    handleSearchValues(searchValue);
  }, [searchValue, handleSearchValues]);

  return (
    <div className="flex bg-white  m-2 rounded-l-md rounded-r-md border items-center ">
      <input
        className="p-3 rounded-lg"
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
