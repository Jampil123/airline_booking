const bookingData = getData("bookingData");
const departContainer = document.getElementById("departFlights");
const returnContainer = document.getElementById("returnFlights");
const summaryElement = document.getElementById("bookingSummary");

if (!bookingData) {
  summaryElement.innerHTML = "⚠️ No booking data found. Please go back to the Booking page.";
} else {
  summaryElement.innerHTML = `
    <strong>${bookingData.from}</strong> ➜ <strong>${bookingData.to}</strong><br>
    ${bookingData.trip === "round" ? "Round Trip" : "One Way"} |
    Depart: ${bookingData.depart}
    ${bookingData.trip === "round" ? "| Return: " + bookingData.ret : ""} |
    Passengers: ${bookingData.passengers}
  `;
}

const departFlights = flightSchedules.filter(f =>
  f.from.toLowerCase() === bookingData.from.toLowerCase() &&
  f.to.toLowerCase() === bookingData.to.toLowerCase()
);

let returnFlights = [];
if (bookingData.trip === "round") {
  returnFlights = flightSchedules.filter(f =>
    f.from.toLowerCase() === bookingData.to.toLowerCase() &&
    f.to.toLowerCase() === bookingData.from.toLowerCase()
  );
}

if (departFlights.length === 0) {
  departContainer.innerHTML = `<p style="text-align:center;color:#777;">No departing flights found.</p>`;
} else {
  const title = document.createElement("h3");
  title.textContent = "Select Departing Flight";
  departContainer.appendChild(title);

  departFlights.forEach(f => {
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
      <div class="flight-info">
        <h3>${f.no} - ${f.fare}</h3>
        <p><strong>${f.from}</strong> → <strong>${f.to}</strong></p>
        <p>Depart: ${bookingData.depart} ${f.departTime}</p>
        <p>Duration: ${f.duration}</p>
        <p>Seats Available: ${f.seats}</p>
      </div>
      <div class="price">
        <h4>₱${f.price}</h4>
        <button class="select-btn">Select</button>
      </div>
    `;
    card.querySelector(".select-btn").addEventListener("click", () => {
      saveData("selectedDepartFlight", f);
      if (bookingData.trip === "oneway") {
        redirectTo("passenger.html");
      } else {
        alert("Departing flight selected. Now choose your return flight below.");
      }
    });
    departContainer.appendChild(card);
  });
}

if (bookingData.trip === "round") {
  if (returnFlights.length === 0) {
    returnContainer.innerHTML = `<p style="text-align:center;color:#777;">No return flights found.</p>`;
  } else {
    const title = document.createElement("h3");
    title.textContent = "Select Return Flight";
    returnContainer.appendChild(title);

    returnFlights.forEach(f => {
      const card = document.createElement("div");
      card.className = "flight-card";
      card.innerHTML = `
        <div class="flight-info">
          <h3>${f.no} - ${f.fare}</h3>
          <p><strong>${f.from}</strong> → <strong>${f.to}</strong></p>
          <p>Return: ${bookingData.ret} ${f.departTime}</p>
          <p>Duration: ${f.duration}</p>
          <p>Seats Available: ${f.seats}</p>
        </div>
        <div class="price">
          <h4>₱${f.price}</h4>
          <button class="select-btn">Select</button>
        </div>
      `;
      card.querySelector(".select-btn").addEventListener("click", () => {
        saveData("selectedReturnFlight", f);
        redirectTo("passenger.html");
      });
      returnContainer.appendChild(card);
    });
  }
}
