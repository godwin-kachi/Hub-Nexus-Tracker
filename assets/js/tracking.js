document.getElementById("tracking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const trackingNumber =
    document.getElementById("tracking-number").value;

  // Validate the tracking number on the server-side
  fetch(`/api/tracking/${trackingNumber}`)
    .then((response) => response.json())
    .then((result) => {
      if (result.valid) {
        // Redirect the user to the Shipment Details page
        window.location.href = `/trackdetails.html?trackingNumber=${trackingNumber}`;
      } else {
        alert("Invalid tracking number. Please check and try again.");
      }
    })
    .catch((error) => {
      console.error("Error validating tracking number:", error);
      alert("An error occurred while validating the tracking number.");
    });
});