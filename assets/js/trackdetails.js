const urlParams = new URLSearchParams(window.location.search);
const trackingNumber = urlParams.get("trackingNumber");

// Redirect to tracking page if tracking number is null
if (trackingNumber == null || trackingNumber.trim() == "") {
  window.location.href = "/tracking.html";
}
document.getElementById("t_no").innerText = trackingNumber;

// Variables
const orderID = document.getElementById("orderID");
const orderDate = document.getElementById("orderDate");
const orderOrigin = document.getElementById("orderOrigin") 
const orderPickUpDestination = document.getElementById("orderPickUpDestination");
const orderCurrentLocation = document.getElementById("orderCurrentLocation")
const orderTrackingTime = document.getElementById("orderTrackingTime");

const senderName = document.getElementById("senderName"); 
const senderEmail = document.getElementById("senderEmail");
const senderPhoneNumber = document.getElementById("senderPhoneNumber");
const senderAddress = document.getElementById("senderAddress");  

const receiverName = document.getElementById("receiverName"); 
const receiverEmail = document.getElementById("receiverEmail");
const receiverPhoneNumber = document.getElementById("receiverPhoneNumber");
const receiverAddress = document.getElementById("receiverAddress");  

const apiurl = location.protocol + "//" + location.hostname + "/api";
console.log(apiurl + `/packageapi/searchpackage.php?tracking_no=${trackingNumber}`);


const searchData = {
  searchstring: trackingNumber,
  searchcolumn: "tracking_no"
}

const configData = {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify(searchData)
}

displayTrackingDetails();


function displayTrackingDetails() {

    // Fetch tracking details from the API
  // fetch(apiurl + `/packageapi/searchpackage.php?tracking_no=${trackingNumber}`, configData)
  fetch(apiurl+"/packageapi/getpackages.php", {mode: "no-cors"})
      .then((response) => response.json())
      .then((data) => {

        console.log(data);
        // if (!data) {
        //     alert("Invalid tracking number. Please check and try again.");
        //     window.location.href = "/tracking.html";
        //     return;
        //   }
        // // Update the tracking information based on the API response
        // document.getElementById("sender-name").textContent =
        //   data.sender_name;
        // document.getElementById("sender-phone").textContent =
        //   data.sender_phone;
        // document.getElementById("sender-email").textContent =
        //   data.sender_email;
        // document.getElementById("sender-address").textContent =
        //   data.sender_address;

        // document.getElementById("receiver-name").textContent =
        //   data.receiver_name;
        // document.getElementById("receiver-email").textContent =
        //   data.receiver_email;
        // document.getElementById("receiver-phone").textContent =
        //   data.receiver_phone;
        // document.getElementById("receiver-location").textContent =
        //   data.receiver_location;

        // document.getElementById("tracking-id").textContent =
        //   data.tracking_id;
        // document.getElementById("invoice-number").textContent =
        //   data.invoice_number;
        // document.getElementById("shipment-date").textContent =
        //   data.shipment_date;
        // document.getElementById("delivery-date").textContent =
        //   data.delivery_date;
        // document.getElementById("weight").textContent = data.weight;
        // document.getElementById("quantity").textContent = data.quantity;
        // document.getElementById("mode-of-shipment").textContent =
        //   data.mode_of_shipment;
        // document.getElementById("type-of-shipment").textContent =
        //   data.type_of_shipment;
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
        console.error("Error fetching tracking details:", error);
        // alert("Error fetching tracking details. Please try again later.");
      });
  }

  function toggleSection(element) {
    var content = element.nextElementSibling;
    if (content.style.display === "none") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  }