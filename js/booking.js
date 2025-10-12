// booking.js

// Select elements
const oneWay = document.querySelector('input[value="oneway"]');
const roundTrip = document.querySelector('input[value="round"]');
const returnGroup = document.getElementById("returnGroup");
const searchBtn = document.getElementById("searchBtn");

// Toggle return date visibility
oneWay.addEventListener("change", () => {
  returnGroup.classList.add("hidden");
});
roundTrip.addEventListener("change", () => {
  returnGroup.classList.remove("hidden");
});

// Handle booking form submission
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const trip = document.querySelector('input[name="trip"]:checked').value;
  const depart = document.getElementById("depart").value;
  const ret = document.getElementById("return").value;
  const passengers = document.getElementById("passengers").value;

  // Validate form
  if (!validateBookingForm(from, to, trip, depart, ret)) return;

  // Save booking data
  const bookingData = { from, to, trip, depart, ret, passengers };
  saveData("bookingData", bookingData);

  // Redirect to flight selection
  redirectTo("flight.html");
});
