export function FinalPrice(
  numGuests,
  discount,
  pricePerNight,
  extraPrice,
  breakfastPrice,
  stayDuration,
  guests
) {
  const finalPrice =
    numGuests > 1
      ? discount
        ? pricePerNight * stayDuration +
          extraPrice -
          Math.abs(discount) +
          breakfastPrice *
            stayDuration *
            guests?.filter((guest) => guest.hasBreakfast).length
        : pricePerNight * stayDuration +
          extraPrice +
          breakfastPrice *
            stayDuration *
            guests?.filter((guest) => guest.hasBreakfast).length
      : discount
      ? pricePerNight * stayDuration +
        extraPrice -
        Math.abs(discount) +
        (guests[0]?.hasBreakfast && breakfastPrice * stayDuration)
      : pricePerNight * stayDuration +
        extraPrice +
        (guests[0]?.hasBreakfast && breakfastPrice * stayDuration);

  return finalPrice;
}

export function NumGuestsWithBreakfast(guests) {
  const guestWbrekfast = guests?.filter((guest) => guest?.hasBreakfast).length;
  return guestWbrekfast;
}
