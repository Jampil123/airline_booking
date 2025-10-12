// summary.js

// Retrieve data from localStorage
const bookingData = JSON.parse(localStorage.getItem("bookingData"));
const departFlight = JSON.parse(localStorage.getItem("selectedDepartFlight"));
const returnFlight = JSON.parse(localStorage.getItem("selectedReturnFlight"));
const passenger = JSON.parse(localStorage.getItem("passengerInfo"));

// Elements
const bookingSection = document.getElementById("bookingDetails");
const flightSection = document.getElementById("flightDetails");
const passengerSection = document.getElementById("passengerDetails");

// 1️⃣ Booking Details
if (bookingData) {
  bookingSection.innerHTML = `
    <h3>Booking Details</h3>
    <p class="info-item"><strong>From:</strong> ${bookingData.from}</p>
    <p class="info-item"><strong>To:</strong> ${bookingData.to}</p>
    <p class="info-item"><strong>Trip Type:</strong> ${bookingData.trip === "round" ? "Round Trip" : "One Way"}</p>
    <p class="info-item"><strong>Depart Date:</strong> ${bookingData.depart}</p>
    ${bookingData.trip === "round" ? `<p class="info-item"><strong>Return Date:</strong> ${bookingData.ret}</p>` : ""}
    <p class="info-item"><strong>Passengers:</strong> ${bookingData.passengers}</p>
  `;
}

// 2️⃣ Flight Details
if (departFlight) {
  flightSection.innerHTML = `
    <h3>Flight Details</h3>
    <p class="info-item"><strong>Depart Flight:</strong> ${departFlight.no} (${departFlight.from} → ${departFlight.to})</p>
    <p class="info-item"><strong>Depart Time:</strong> ${departFlight.departTime}</p>
    <p class="info-item"><strong>Fare:</strong> ₱${departFlight.price}</p>
  `;

  if (bookingData.trip === "round" && returnFlight) {
    flightSection.innerHTML += `
      <p class="info-item"><strong>Return Flight:</strong> ${returnFlight.no} (${returnFlight.from} → ${returnFlight.to})</p>
      <p class="info-item"><strong>Return Time:</strong> ${returnFlight.departTime}</p>
      <p class="info-item"><strong>Fare:</strong> ₱${returnFlight.price}</p>
    `;
  }
}

// 3️⃣ Passenger Info
if (passenger) {
  passengerSection.innerHTML = `
    <h3>Passenger Information</h3>
    <p class="info-item"><strong>Name:</strong> ${passenger.name}</p>
    <p class="info-item"><strong>Age:</strong> ${passenger.age}</p>
    <p class="info-item"><strong>Email:</strong> ${passenger.email}</p>
    <p class="info-item"><strong>Contact:</strong> ${passenger.contact}</p>
  `;
}

// 4️⃣ Confirm Booking
document.getElementById("confirmBtn").addEventListener("click", () => {
  alert("✅ Booking Confirmed! Thank you for choosing AirLines.");
  localStorage.clear();
  window.location.href = "index.html"; // return to homepage
});
