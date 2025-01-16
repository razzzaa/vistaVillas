import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 8;

export function useCabins() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get("discount-availability");

  /* FILTER.................................................................................................................................... */
  let filter;
  if (!filterValue || filterValue === "all") filter = null;

  if (filterValue === "no-discount")
    filter = { method: "is", field: "discount", value: null };

  if (filterValue === "with-discount")
    filter = { method: "gt", field: "discount", value: 1 };

  if (filterValue === "available")
    filter = { field: "availability", value: true };
  /*.................................................................................................................................... */

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ["cabins", page, filter],
    queryFn: () => getCabins({ page, filter }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  console.log(pageCount);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", page + 1, filter],
      queryFn: () => getCabins({ page: page + 1, filter }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", page - 1, filter],
      queryFn: () => getCabins({ page: page - 1, filter }),
    });
  }

  console.log(cabins);
  return { cabins, isLoading, count };
}
