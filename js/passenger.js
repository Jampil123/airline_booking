const bookingData = getData("bookingData");
const departFlight = getData("selectedDepartFlight");
const returnFlight = getData("selectedReturnFlight");
const form = document.getElementById("passengerForm");
const flightSummary = document.getElementById("flightSummary");

// document.getElementById("flightSummary").style.display = "none";

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

const passengerCount = parseInt(bookingData?.passengers || 1);
if (passengerCount > 1) {
  const originalFormContent = document.querySelector("#passengerForm").innerHTML;
  const formFields = originalFormContent.replace(/<button[^>]*>.*?<\/button>/, '');
  
  let formHTML = '';

  for (let i = 1; i <= passengerCount; i++) {
    formHTML += `
      <div class="passenger-block">
        <h3>Passenger ${i}</h3>
        ${formFields
          .replace(/id="/g, `id="passenger${i}_`)
          .replace(/name="/g, `name="passenger${i}_`)}
      </div>
    `;
  }
  formHTML += `
    <div class="form-group">
      <button type="submit" class="submit-btn">Proceed to Summary</button>
    </div>
  `;

  document.getElementById("passengerForm").innerHTML = formHTML;
}


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const passengerCount = parseInt(bookingData?.passengers || 1);
  const passengers = [];

  for (let i = 1; i <= passengerCount; i++) {
    const prefix = passengerCount > 1 ? `passenger${i}_` : '';
    
    const name = document.getElementById(`${prefix}fullName`).value.trim();
    const age = parseInt(document.getElementById(`${prefix}age`).value);
    const email = document.getElementById(`${prefix}email`).value.trim();
    const contact = document.getElementById(`${prefix}contact`).value.trim();

    if (!validatePassengerForm(name, age, email, contact)) return;

    passengers.push({ name, age, email, contact });
  }

  saveData("passengerInfo", passengers);
  redirectTo("summary.html");
});