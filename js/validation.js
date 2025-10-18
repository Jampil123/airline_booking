function validateBookingForm(from, to, trip, depart, ret) {
  if (!from || !to || !depart) {
    alert("Please fill in all required fields.");
    return false;
  }
  if (trip === "round" && !ret) {
    alert("Return date is required for round trip.");
    return false;
  }
  return true;
}

function validatePassengerForm(name, age, email, contact) {
  if (!name || !age || !email || !contact) {
    alert("Please fill in all passenger fields.");
    return false;
  }
  if (age <= 0) {
    alert("Please enter a valid age.");
    return false;
  }
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  const contactRegex = /^[0-9]{10,15}$/;
  if (!contactRegex.test(contact)) {
    alert("Please enter a valid contact number (10–15 digits).");
    return false;
  }
  return true;
}

