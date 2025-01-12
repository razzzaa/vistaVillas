export function formatDateManual(dateString) {
  const date = new Date(dateString);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[date.getDay()];
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const dayOfMonth = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${day} ${month}/${dayOfMonth}/${year}`;
}

export function calculateStayDetails(arrivalDateString, departureDateString) {
  const currentDate = new Date();
  const arrivalDate = new Date(arrivalDateString);
  const departureDate = new Date(departureDateString);

  const timeUntilArrival = arrivalDate - currentDate;

  const daysUntilArrival = Math.ceil(timeUntilArrival / 86400000);

  const stayDuration = Math.ceil((departureDate - arrivalDate) / 86400000);

  const yearsUntilArrival = Math.floor(daysUntilArrival / 365);

  const remainingDaysAfterYears = daysUntilArrival % 365;

  const monthsUntilArrival = Math.floor(remainingDaysAfterYears / 30);

  const daysAfterMonths = remainingDaysAfterYears % 30;

  let arrivalString = "In ";
  const stayString = `${stayDuration} nights stay`;

  if (daysUntilArrival === 0) {
    arrivalString = "Arriving today";
    console.log("today", arrivalString);

    return { arrivalString, stayString };
  }
  if (daysUntilArrival < 0 && Math.abs(daysUntilArrival) >= stayDuration) {
    arrivalString = `Stay Duration Expired, Time to Check-Out`;
    console.log("checkOut", arrivalString);
    return { arrivalString, daysUntilArrival };
  }

  if (daysUntilArrival < 0) {
    arrivalString = `${Math.abs(daysUntilArrival)} Days ago`;
    console.log("Days ago", arrivalString);

    return { arrivalString, stayString, daysUntilArrival };
  }

  if (yearsUntilArrival > 0) arrivalString += `${yearsUntilArrival} years `;
  if (monthsUntilArrival > 0) arrivalString += `${monthsUntilArrival} months `;
  if (daysAfterMonths > 0 || (!yearsUntilArrival && !monthsUntilArrival)) {
    arrivalString += `${daysAfterMonths} days `;
  }

  return { arrivalString, stayString };
}

//CALCULATE NIGHTS STAY FOR PRICE
//..............................................................................................................................................................................
export function StayDurationCalc(arraival, checkOut) {
  const arrivalDate = new Date(arraival);
  const departureDate = new Date(checkOut);
  const stayDuration = Math.ceil((departureDate - arrivalDate) / 86400000);
  return stayDuration;
}
