import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 8;

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("booking");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", page, filter, sortBy],
    queryFn: () => getAllBookings({ filter, page, sortBy }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", page + 1, filter, sortBy],
      queryFn: () => getAllBookings({ filter, page: page + 1, sortBy }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", page - 1, filter, sortBy],
      queryFn: () => getAllBookings({ filter, page: page - 1, sortBy }),
    });

  return { bookings, isLoading, error, count };
}
