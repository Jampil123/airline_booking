// passenger.js

const bookingData = getData("bookingData");
const departFlight = getData("selectedDepartFlight");
const returnFlight = getData("selectedReturnFlight");
const form = document.getElementById("passengerForm");
const flightSummary = document.getElementById("flightSummary");

// 🧾 1️⃣ Display Flight Summary
if (!bookingData) {
  flightSummary.innerHTML = "⚠️ No booking found. Please start over.";
} else {
  let summaryHTML = `
    <p><strong>Passenger(s):</strong> ${bookingData.passengers}</p>
    <p><strong>Trip Type:</strong> ${bookingData.trip === "round" ? "Round Trip" : "One Way"}</p>
  `;

  if (departFlight) {
    summaryHTML += `
      <div style="margin-top:10px;">
        <h4>Departing Flight:</h4>
        <p>${departFlight.no} — ${departFlight.from} → ${departFlight.to}</p>
        <p>Date: ${bookingData.depart} | ${departFlight.departTime}</p>
        <p>Fare: ₱${departFlight.price}</p>
      </div>
    `;
  }

  if (bookingData.trip === "round" && returnFlight) {
    summaryHTML += `
      <div style="margin-top:10px;">
        <h4>Return Flight:</h4>
        <p>${returnFlight.no} — ${returnFlight.from} → ${returnFlight.to}</p>
        <p>Date: ${bookingData.ret} | ${returnFlight.departTime}</p>
        <p>Fare: ₱${returnFlight.price}</p>
      </div>
    `;
  }

  flightSummary.innerHTML = summaryHTML;
}

// 🧾 2️⃣ Handle Passenger Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!validatePassengerForm(name, age, email, contact)) return;

  const passengerInfo = { name, age, email, contact };

  // Save to localStorage
  saveData("passengerInfo", passengerInfo);

  // Redirect to summary page
  redirectTo("summary.html");
});
