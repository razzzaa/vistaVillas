import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 8;

export function useCabins() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  /* FILTER.................................................................................................................................... */
  const filterValue = searchParams.get("discount-availability");
  let filter;
  if (!filterValue || filterValue === "all") filter = null;

  if (filterValue === "no-discount")
    filter = { method: "is", field: "discount", value: null };

  if (filterValue === "with-discount")
    filter = { method: "gt", field: "discount", value: 1 };

  if (filterValue === "available")
    filter = { field: "availability", value: true };
  /*.................................................................................................................................... */

  /* SORT.................................................................................................................................... */
  const sortBy = searchParams.get("sortBy") || "cabin_name-asc";
  const [field, direction] = sortBy.split("-");
  const sort = { field, direction };
  /*.................................................................................................................................... */

  /* pagination.................................................................................................................................... */
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  /*.................................................................................................................................... */

  const {
    isLoading,
    data: { data: cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ["cabins", page, filter, sort],
    queryFn: () => getCabins({ page, filter, sort }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  console.log(pageCount);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", page + 1, filter, sort],
      queryFn: () => getCabins({ page: page + 1, filter, sort }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", page - 1, filter, sort],
      queryFn: () => getCabins({ page: page - 1, filter, sort }),
    });
  }

  console.log(cabins);
  return { cabins, isLoading, count };
}
