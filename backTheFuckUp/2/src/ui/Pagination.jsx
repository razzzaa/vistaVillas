import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";
import { constPageSize } from "../utils/pageSize";
constPageSize;

function Pagination({ count, pageSize = constPageSize }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const PAGE_SIZE = 8;

  const pageCount = Math.ceil(count / pageSize);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className=" flex p-2 text-sm items-center justify-between">
      <p>
        showing{" "}
        <span className="font-bold">{(currentPage - 1) * pageSize + 1}</span> to{" "}
        <span className="font-bold">
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{" "}
        of <span className="font-bold">{count}</span> results
      </p>
      <div className="flex items-center">
        <button
          onClick={prevPage}
          className="flex items-center p-2 hover:bg-medium-yellow rounded-md transition-all duration-300"
          disabled={currentPage === 1}
        >
          <GrFormPrevious />
          <span>Previous</span>
        </button>
        <button
          onClick={nextPage}
          className="flex items-center p-2 hover:bg-medium-yellow rounded-md transition-all duration-300"
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <GrFormNext />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
