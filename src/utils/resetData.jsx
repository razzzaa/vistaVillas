import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import Button from "../ui/Button";
import useDeleteBooking from "../features/Bookings/useDeleteBooking";
import useDeleteCabin from "../features/Cabins/useDeleteCabin";
import useDeleteAllGuests from "../features/Guests/useDeleteAllGuests";
import useDeleteAllBookings from "../features/Bookings/useDeleteAllBookings";
import useDeleteAllCabins from "../features/Cabins/useDeleteAllCabins";
import { useNavigate } from "react-router-dom";
import useAddCabin from "../features/Cabins/useAddCabin";
import useResetGuests from "../features/Guests/useResetGuests";
import { addEditGuests, resetGuests } from "../services/apiGuests";
import useResetCabins from "../features/Cabins/useResetCabins";
import { resetBookings } from "../services/apiBookings";
import useResetBookings from "../features/Bookings/useResetBookings";
import useResetBookingsGuests from "../features/Bookings/useResetBookingsGuests";

function csvToArr(stringVal, splitter) {
  const [keys, ...rest] = stringVal
    .trim()
    .split("\n")
    .map((item) => item.split(splitter));

  return rest.map((item) => {
    const object = {};
    keys.forEach((key, index) => {
      if (key && item[index]) {
        let cleanedKey = key.replace(/\r/g, "").trim();
        let cleanedValue = item[index].replace(/\r/g, "").trim();

        // Handle description field with quotes and backslashes
        if (cleanedKey === "description") {
          // Remove the surrounding double quotes and escape characters
          cleanedValue = cleanedValue
            .replace(/^"|"$/g, "") // Remove leading and trailing quotes
            .replace(/\\"/g, '"') // Replace escaped quotes with normal quotes
            .replace(/\\/g, "") // Remove any backslashes
            .replace(/\s+/g, " ") // Remove multiple spaces and replace with a single space
            .trim(); // Remove leading and trailing spaces
        }

        // Add the cleaned key-value pair to the object
        object[cleanedKey] = cleanedValue;
      }
    });
    return object;
  });
}

function shiftDates(booking) {
  const today = new Date(); // Get today's date

  const originalCreatedAt = new Date(booking.created_at);
  const originalStartDate = new Date(booking.startDate);
  const originalEndDate = new Date(booking.endDate);

  // Calculate the difference in days
  const startDiff =
    (originalStartDate - originalCreatedAt) / (1000 * 60 * 60 * 24);
  const endDiff = (originalEndDate - originalCreatedAt) / (1000 * 60 * 60 * 24);

  // Move startDate and endDate forward by the same difference
  const newStartDate = new Date(today);
  newStartDate.setDate(newStartDate.getDate() + startDiff);

  const newEndDate = new Date(today);
  newEndDate.setDate(newEndDate.getDate() + endDiff);

  return {
    ...booking,
    created_at: today.toISOString(),
    startDate: newStartDate.toISOString(),
    endDate: newEndDate.toISOString(),
    status: "unconfirmed",
  };
}

export default function CsvReader() {
  const [bookingsData, setBookingsData] = useState([]);
  const [guestsData, setGuestsData] = useState([]);
  const [bookingGuestsData, setBookingGuestsData] = useState([]);
  const [cabinsData, setCabinsData] = useState([]);

  const navigate = useNavigate();

  const { delAllBookings } = useDeleteAllBookings();
  const { delAllGuests } = useDeleteAllGuests();
  const { delAllCabins } = useDeleteAllCabins();
  const { resGuests } = useResetGuests();
  const { resCabins } = useResetCabins();
  const { resBookings } = useResetBookings();
  const { resBookingsGuests } = useResetBookingsGuests();

  const fetchCsv = async (filePath, applyShiftDates = false) => {
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      const parsedData = csvToArr(text, ","); // Convert to Array of Objects

      // Apply shiftDates only to bookingsRows.csv
      return applyShiftDates ? parsedData.map(shiftDates) : parsedData;
    } catch (error) {
      console.error(`Error fetching CSV from ${filePath}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const bookings = await fetchCsv(
        "/data/currentDateData/bookingsRows.csv",
        true
      ); // Apply shiftDates
      const guests = await fetchCsv("/data/currentDateData/guests.csv");
      const bookingGuests = await fetchCsv(
        "/data/currentDateData/bookingsGuests.csv"
      );
      const cabins = await fetchCsv("/data/currentDateData/cabins.csv");

      setBookingsData(bookings);
      setGuestsData(guests);
      setBookingGuestsData(bookingGuests);
      setCabinsData(cabins);
    };

    fetchData();
  }, []);

  function deleteAll() {
    delAllBookings();
    delAllGuests();
    delAllCabins();
  }

  async function resetAll() {
    console.log(bookingsData);
    console.log(guestsData);
    console.log(bookingGuestsData);
    console.log(cabinsData);

    await delAllBookings();
    await delAllGuests();
    await delAllCabins();

    await resGuests(guestsData);
    await resCabins(cabinsData);
    await resBookings(bookingsData);
    await resBookingsGuests(bookingGuestsData);
  }

  return (
    <div>
      <Button
        buttonContainer={"flex justify-center px-2"}
        text={"RESET-DATA"}
        style={
          "flex justify-center items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:text-white shadow-md w-[100%]"
        }
        onClick={() => resetAll()}
      />
      <Button
        buttonContainer={"flex justify-center px-2"}
        text={"DELETE-DATA"}
        style={
          "flex justify-center items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:text-white shadow-md w-[100%]"
        }
        onClick={() => deleteAll()}
      />
    </div>
  );
}
