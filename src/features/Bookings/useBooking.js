import { useQuery } from "@tanstack/react-query";
import { getBookingsById } from "../../services/apiBookings";

export function useBooking(id) {
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryFn: () => getBookingsById(id),
  });

  return { booking, isLoading };
}
