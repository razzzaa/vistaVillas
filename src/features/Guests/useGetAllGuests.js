import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { useSearchValues } from "../../context/SearchContext";
import { getGuests } from "../../services/apiGuests";

export function useGetAllGuests() {
  //   const { CurSearchValue } = useSearchValues();

  /* search.................................................................................................................................... */
  //   const search = CurSearchValue;

  const {
    data: { data: guests } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  return { guests, isLoading, error };
}
