import { useQuery } from "@tanstack/react-query";
import { getBookingsById } from "../../services/apiBookings";

export function useBooking(id) {
  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingsById(id),
  });

  return { booking, isPending, error };
}
