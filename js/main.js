
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function redirectTo(page) {
  window.location.href = page;
}

function clearBookingData() {
  localStorage.removeItem("bookingData");
  localStorage.removeItem("selectedFlight");
  localStorage.removeItem("passengers");
}





