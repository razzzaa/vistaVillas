import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
getBookings;

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings, isLoading };
}
