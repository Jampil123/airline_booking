// main.js

// Save data to localStorage (used by multiple pages)
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get saved data
function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function redirectTo(page) {
  window.location.href = page;
}

// Clear data after booking is done
function clearBookingData() {
  localStorage.removeItem("bookingData");
  localStorage.removeItem("selectedFlight");
  localStorage.removeItem("passengers");
}




