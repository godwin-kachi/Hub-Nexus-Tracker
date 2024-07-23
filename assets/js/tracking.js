document.getElementById("tracking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const trackingNo = document.getElementById("tracking-number").value;
  trackingNumber = trackingNo.trim();

  console.log(trackingNumber);

  let strRegex = new RegExp(/[^a-zA-Z0-9]/);
  let match_result = strRegex.test(trackingNumber)
         
  if (trackingNumber == undefined || trackingNumber == null || trackingNumber == "" || match_result) {
    alert("Enter a valid tracking number and try again.");
  } else {
    // Redirect the user to the Shipment Details page
    window.location.href = `/trackdetails.html?trackingNumber=${trackingNumber}`;
  }
});




// Old code block for reference

// Validate the tracking number on the server-side
// fetch(`/api/tracking/${trackingNumber}`)
//   .then((response) => response.json())
//   .then((result) => {
//     if (result.valid) {
//       // Redirect the user to the Shipment Details page
//       window.location.href = `/trackdetails.html?trackingNumber=${trackingNumber}`;
//     } else {
//       alert("Invalid tracking number. Please check and try again.");
//     }
//   })
//   .catch((error) => {
//     console.error("Error validating tracking number:", error);
//     alert("An error occurred while validating the tracking number.");
//   });
