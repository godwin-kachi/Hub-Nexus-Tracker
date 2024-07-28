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
const orderOrigin = document.getElementById("orderOrigin");
const orderPickUpDestination = document.getElementById("orderPickUpDestination");
const orderCurrentLocation = document.getElementById("orderCurrentLocation");
const orderTrackingTime = document.getElementById("orderTrackingTime");

const senderName = document.getElementById("senderName");
const senderEmail = document.getElementById("senderEmail");
const senderPhoneNumber = document.getElementById("senderPhoneNumber");
const senderAddress = document.getElementById("senderAddress");

const receiverName = document.getElementById("receiverName");
const receiverEmail = document.getElementById("receiverEmail");
const receiverPhoneNumber = document.getElementById("receiverPhoneNumber");
const receiverAddress = document.getElementById("receiverAddress");

// Consignment details
const cdTrackingNo = document.getElementById("cd_tracking_no");
const cdDescription = document.getElementById("cd_description");
const cdQuantity = document.getElementById("cd_quantity");
const cdComment = document.getElementById("cd_comment");


const apiurl = `${location.protocol}//${location.hostname}/api`;

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
  fetch(`${apiurl}/packageapi/searchpackage.php`, configData)
    .then((response) => {
      // Check if the response is not OK, then read as text
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Error response from server: ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (!data) {
        alert("Invalid tracking number. Please check and try again.");
        window.location.href = "/tracking.html";
        return;
      }
      console.log(data);
      // Update the tracking information based on the API response
      orderID.textContent = data.result[0].tracking_no;
      orderDate.textContent = data.result[0].created_at;
      orderOrigin.textContent = data.result[0].sending_loc;
      orderCurrentLocation.textContent = data.result[0].package_loc ?? data.result[0].sending_loc;
      orderTrackingTime.textContent = data.result[0].created_at;

      senderName.textContent = data.result[0].sender_name;
      senderEmail.textContent = data.result[0].sender_phone;
      senderPhoneNumber.textContent = data.result[0].sender_email;
      senderAddress.textContent = data.result[0].sender_address;

      receiverName.textContent = data.result[0].receiver_name;
      receiverEmail.textContent = data.result[0].receiver_email;
      receiverPhoneNumber.textContent = data.result[0].receiver_phone;
      receiverAddress.textContent = data.result[0].receiver_address;
     
      cdTrackingNo.textContent = data.result[0].tracking_no;
      cdDescription.textContent = data.result[0].description;
      cdQuantity.textContent = data.result[0].cd_quantity ?? 1;
      cdComment.textContent = data.result[0].comment;
     
    

      // .textContent = data.result.weight;
      // .textContent = data.result.quantity;
      // .textContent = data.result.mode_of_shipment;
      // .textContent = data.result.type_of_shipment;
    })
    .catch((error) => {
      // Log the error to console
      console.error("Error fetching tracking details:", error);
      alert("Error fetching tracking details. Please try again later.");
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
