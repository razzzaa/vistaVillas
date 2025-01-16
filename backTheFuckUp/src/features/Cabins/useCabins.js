import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 8;

export function useCabins() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  console.log(page);

  const {
    isLoading,
    data: { data: cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ["cabins", page],
    queryFn: () => getCabins({ page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  console.log(pageCount);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", page + 1],
      queryFn: () => getCabins({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", page - 1],
      queryFn: () => getCabins({ page: page - 1 }),
    });
  }

  console.log(cabins);
  return { cabins, isLoading, count };
}
