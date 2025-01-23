import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useAllBookings() {
  const {
    isPending,
    data: { data: allBookings } = {},
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: getAllBookings,
  });

  console.log(allBookings);
  return { allBookings, isPending, error };
}
