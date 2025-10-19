// Get all data from localStorage
const bookingData = JSON.parse(localStorage.getItem("bookingData"));
const departFlight = JSON.parse(localStorage.getItem("selectedDepartFlight"));
const returnFlight = JSON.parse(localStorage.getItem("selectedReturnFlight"));
const passengers = JSON.parse(localStorage.getItem("passengerInfo"));

const bookingSection = document.getElementById("bookingDetails");
const flightSection = document.getElementById("flightDetails");
const passengerSection = document.getElementById("passengerDetails");

// Display booking details
if (bookingData) {
  bookingSection.innerHTML = `
    <h3>Booking Details</h3>
    <p class="info-item"><strong>From:</strong> ${bookingData.from}</p>
    <p class="info-item"><strong>To:</strong> ${bookingData.to}</p>
    <p class="info-item"><strong>Trip Type:</strong> ${bookingData.trip === "round" ? "Round Trip" : "One Way"}</p>
    <p class="info-item"><strong>Depart Date:</strong> ${formatDate(bookingData.depart)}</p>
    ${bookingData.trip === "round" && bookingData.ret ? `<p class="info-item"><strong>Return Date:</strong> ${formatDate(bookingData.ret)}</p>` : ""}
    <p class="info-item"><strong>Passengers:</strong> ${bookingData.passengers}</p>
    <p class="info-item"><strong>Class:</strong> ${bookingData.class || "Economy"}</p>
  `;
} else {
  bookingSection.innerHTML = `<p class="error">No booking data found</p>`;
}

// Display flight details with total price calculation
if (departFlight) {
  let totalPrice = parseFloat(departFlight.price);
  let flightHTML = `
    <h3>Flight Details</h3>
    <div class="flight-card">
      <h4>Departure Flight</h4>
      <p class="info-item"><strong>Flight:</strong> ${departFlight.no}</p>
      <p class="info-item"><strong>Route:</strong> ${departFlight.from} → ${departFlight.to}</p>
      <p class="info-item"><strong>Date:</strong> ${formatDate(bookingData.depart)}</p>
      <p class="info-item"><strong>Time:</strong> ${departFlight.departTime}</p>
      <p class="info-item"><strong>Duration:</strong> ${departFlight.duration || "N/A"}</p>
      <p class="info-item"><strong>Price:</strong> ₱${parseFloat(departFlight.price).toLocaleString()}</p>
    </div>
  `;

  if (bookingData.trip === "round" && returnFlight) {
    totalPrice += parseFloat(returnFlight.price);
    flightHTML += `
      <div class="flight-card">
        <h4>Return Flight</h4>
        <p class="info-item"><strong>Flight:</strong> ${returnFlight.no}</p>
        <p class="info-item"><strong>Route:</strong> ${returnFlight.from} → ${returnFlight.to}</p>
        <p class="info-item"><strong>Date:</strong> ${formatDate(bookingData.ret)}</p>
        <p class="info-item"><strong>Time:</strong> ${returnFlight.departTime}</p>
        <p class="info-item"><strong>Duration:</strong> ${returnFlight.duration || "N/A"}</p>
        <p class="info-item"><strong>Price:</strong> ₱${parseFloat(returnFlight.price).toLocaleString()}</p>
      </div>
    `;
  }

  // Calculate total for all passengers
  const passengerCount = parseInt(bookingData?.passengers || 1);
  const grandTotal = totalPrice * passengerCount;

  flightHTML += `
    <div class="price-summary">
      <h4>Price Summary</h4>
      <p class="info-item"><strong>Base Fare (${passengerCount} passenger${passengerCount > 1 ? 's' : ''}):</strong> ₱${totalPrice.toLocaleString()} × ${passengerCount}</p>
      <p class="info-item total"><strong>Total Amount:</strong> ₱${grandTotal.toLocaleString()}</p>
    </div>
  `;

  flightSection.innerHTML = flightHTML;
} else {
  flightSection.innerHTML = `<p class="error">No flight details found</p>`;
}

// Display passenger information (handles single or multiple passengers)
if (passengers) {
  let passengerHTML = `<h3>Passenger Information</h3>`;
  
  // Check if it's a single passenger object or array of passengers
  if (Array.isArray(passengers)) {
    // Multiple passengers
    passengers.forEach((passenger, index) => {
      passengerHTML += `
        <div class="passenger-card">
          <h4>Passenger ${index + 1}</h4>
          <p class="info-item"><strong>Name:</strong> ${passenger.name}</p>
          <p class="info-item"><strong>Age:</strong> ${passenger.age}</p>
          <p class="info-item"><strong>Email:</strong> ${passenger.email}</p>
          <p class="info-item"><strong>Contact:</strong> ${passenger.contact}</p>
        </div>
      `;
    });
  } else {
    // Single passenger (backward compatibility)
    passengerHTML += `
      <div class="passenger-card">
        <p class="info-item"><strong>Name:</strong> ${passengers.name}</p>
        <p class="info-item"><strong>Age:</strong> ${passengers.age}</p>
        <p class="info-item"><strong>Email:</strong> ${passengers.email}</p>
        <p class="info-item"><strong>Contact:</strong> ${passengers.contact}</p>
      </div>
    `;
  }
  
  passengerSection.innerHTML = passengerHTML;
} else {
  passengerSection.innerHTML = `<p class="error">No passenger information found</p>`;
}

// Utility function to format dates
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Confirm booking handler
document.getElementById("confirmBtn").addEventListener("click", () => {
  // Create booking confirmation object
  const bookingConfirmation = {
    bookingId: generateBookingId(),
    timestamp: new Date().toISOString(),
    bookingData,
    departFlight,
    returnFlight: bookingData.trip === "round" ? returnFlight : null,
    passengers,
    totalAmount: calculateTotalAmount()
  };

  // Save confirmation for receipt page
  localStorage.setItem("bookingConfirmation", JSON.stringify(bookingConfirmation));
  
  alert("✅ Booking Confirmed! Thank you for choosing AirLines.");
  
  // Optional: Redirect to receipt page instead of home
  window.location.href = "index.html"; // or "receipt.html" if you want a dedicated receipt page
});

// Generate a simple booking ID
function generateBookingId() {
  return 'BK' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
}

// Calculate total amount
function calculateTotalAmount() {
  if (!departFlight) return 0;
  
  let total = parseFloat(departFlight.price);
  if (returnFlight) {
    total += parseFloat(returnFlight.price);
  }
  
  const passengerCount = parseInt(bookingData?.passengers || 1);
  return total * passengerCount;
}