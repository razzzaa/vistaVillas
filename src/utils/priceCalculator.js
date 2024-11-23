export default function (
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
        ? pricePerNight +
          extraPrice -
          Math.abs(discount) +
          breakfastPrice *
            stayDuration *
            guests.filter((guest) => guest.hasBreakfast).length
        : pricePerNight +
          extraPrice +
          breakfastPrice *
            stayDuration *
            guests.filter((guest) => guest.hasBreakfast).length
      : discount
      ? pricePerNight +
        extraPrice -
        Math.abs(discount) +
        (guests[0].hasBreakfast && breakfastPrice * stayDuration)
      : pricePerNight +
        extraPrice +
        (guests[0].hasBreakfast && breakfastPrice * stayDuration);

  return finalPrice;
}
