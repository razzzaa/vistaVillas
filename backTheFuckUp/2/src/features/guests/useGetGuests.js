import { useSearchParams } from "react-router-dom";
import { getGuests } from "../../services/apiGuests";
import { useQuery } from "@tanstack/react-query";
import { useSearchValues } from "../../context/SearchContext";

export function useGuests() {
  const [searchParams] = useSearchParams();
  const { CurSearchValue } = useSearchValues();

  /* SORT......................................................................................................................................... */
  const sortBy = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortBy.split("-");
  const sort = { field, direction };
  /*.............................................................................................................................................. */

  /* search.................................................................................................................................... */
  const search = CurSearchValue;
  /*............................................................................................................................................... */

  /* pagination.................................................................................................................................... */
  const page = {
    curPage: !searchParams.get("page") ? 1 : Number(searchParams.get("page")),
  };

  /*............................................................................................................................................... */

  const {
    data: { data: guests, count, PAGE_SIZE } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guests", sort, page, search],
    queryFn: () => getGuests({ sort, page, search }),
  });

  console.log(guests);

  return { guests, isLoading, error, count, PAGE_SIZE };
}
