import { useSearchParams } from "react-router-dom";
import { getGuests } from "../../services/apiGuests";
import { useQuery } from "@tanstack/react-query";

export function useGuests() {
  const [searchParams] = useSearchParams();

  /* SORT......................................................................................................................................... */
  const sortBy = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortBy.split("-");
  const sort = { field, direction };

  /*.............................................................................................................................................. */

  /* search.................................................................................................................................... */
  /*............................................................................................................................................... */

  /* pagination.................................................................................................................................... */
  const page = {
    curPage: !searchParams.get("page") ? 1 : Number(searchParams.get("page")),
    pageSize: 15,
  };

  /*............................................................................................................................................... */

  const {
    data: { data: guests, count, pageSize } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guests", sort, page],
    queryFn: () => getGuests({ sort, page }),
  });

  console.log(count);
  console.log(guests);

  return { guests, isLoading, error, count, pageSize };
}
