const oneWay = document.querySelector('input[value="oneway"]');
const roundTrip = document.querySelector('input[value="round"]');
const returnGroup = document.getElementById("returnGroup");
const searchBtn = document.getElementById("searchBtn");

oneWay.addEventListener("change", () => {
  returnGroup.classList.add("hidden");
});
roundTrip.addEventListener("change", () => {
  returnGroup.classList.remove("hidden");
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const from = document.getElementById("from").value.trim();
  const to = document.getElementById("to").value.trim();
  const trip = document.querySelector('input[name="trip"]:checked').value;
  const depart = document.getElementById("depart").value;
  const ret = document.getElementById("return").value;
  const passengers = document.getElementById("passengers").value;

  if (!validateBookingForm(from, to, trip, depart, ret)) return;

  const bookingData = { from, to, trip, depart, ret, passengers };
  saveData("bookingData", bookingData);

  redirectTo("flight.html");
});
