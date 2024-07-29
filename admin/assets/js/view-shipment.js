const urlParams = new URLSearchParams(window.location.search);
const vmode = urlParams.get("vmode");
const package_id = urlParams.get("package_id");
const del_type_arr = ["Office Pickup", "Home Delivery"];
const del_sta_arr = [
  "Order Processed",
  "Order Shipped",
  "Order Arrived",
  "Order Completed",
];

// Redirect to tracking page if tracking number is null
if (
  package_id == null ||
  package_id.trim() == "" ||
  Number.isInteger(package_id) ||
  vmode == null ||
  vmode.trim() == ""
) {
  window.location.href =
    "/admin.html?message=" +
    "you went through the wrong route. You have to click the buttons.";
}

// Fake server response data
const data = {
  result: {
    package_id: "1",
    track_no: "TRKNO12345789",
    description: "pack_desc",
    quantity: "pack_qty",
    sender_name: "sender_name",
    sender_email: "sender_email",
    sender_phone: "sender_phone",
    sender_address: "sender_address",
    receiver_name: "receiver_name",
    receiver_email: "receiver_email",
    receiver_phone: "receiver_phone",
    receiver_address: "receiver_address",
    sending_loc: "sending_loc",
    delivery_loc: "delivery_loc",
    service_price: "2333",
    delivery_type: "0",
    delivery_price: "1333",
    comment: "comment",
    created_at: "2-3-24 12:00:00",
    updated_at: "2-3-24 12:00:00",
    package_loc: "package_loc",
    delivery_status_id: "0",
  },
};

// Variables
const pack_id = document.getElementById("pack_id");
const track_no = document.getElementById("track_no");
const pack_desc = document.getElementById("pack_desc");
const pack_qty = document.getElementById("pack_qty");
const sender_name = document.getElementById("sender_name");
const sender_email = document.getElementById("sender_email");
const sender_phone = document.getElementById("sender_phone");
const sender_address = document.getElementById("sender_address");

const receiver_name = document.getElementById("receiver_name");
const receiver_email = document.getElementById("receiver_email");
const receiver_phone = document.getElementById("receiver_phone");
const receiver_address = document.getElementById("receiver_address");

const sending_loc = document.getElementById("sending_loc");
const delivery_loc = document.getElementById("delivery_loc");

const service_price = document.getElementById("service_price");
const delivery_type = document.getElementById("delivery_type");
const delivery_price = document.getElementById("delivery_price");
const pack_created_at = document.getElementById("shipment_date");
const pack_updated_at = document.getElementById("update_date");
const comment = document.getElementById("comment");

const cur_loc = document.getElementById("cur_loc");
const delivery_status = document.getElementById("delivery_status");
// Manage total cost calculations
const delCostDiv = document.getElementById("del_cost_div");
const totalCostElement = document.getElementById("total_cost");

const apiurl = `${location.protocol}//${location.hostname}/api`;

displayTrackingDetails();

function displayTrackingDetails() {
  // Fetch tracking details from the API
  fetch(`${apiurl}/packageapi/getpackage.php?package_id=${package_id}`)
    .then(async (response) => {
      // Check if the response is not OK, then read as text
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error response from server: ${text}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data) {
        alert("Invalid tracking number. Please check and try again.");
        window.location.href =
          "/admin.html" + "Go through the admin panel and try again";
        return;
      }
      console.log(data);
      // Update the tracking information based on the API response
      console.log(data.result.package_id);
      // Test code
      pack_id.value = data.result.package_id;
      track_no.value = data.result.track_no;
      pack_desc.value = data.result.description;
      pack_qty.value = data.result.quantity;

      sender_name.value = data.result.sender_name;
      sender_email.value = data.result.sender_email;
      sender_phone.value = data.result.sender_phone;
      sender_address.value = data.result.sender_address;

      receiver_name.value = data.result.receiver_name;
      receiver_email.value = data.result.receiver_email;
      receiver_phone.value = data.result.receiver_phone;
      receiver_address.value = data.result.receiver_address;

      sending_loc.value = data.result.sending_loc;
      delivery_loc.value = data.result.delivery_loc;
      service_price.value = data.result.service_price;
      delivery_type.value = data.result.delivery_type;
      delivery_price.value =
        data.result.delivery_type == 0 ? 0 : data.result.delivery_price;
      comment.value = data.result.comment;
      pack_created_at.value = data.result.created_at;
      pack_updated_at.value = data.result.updated_at;
      cur_loc.value = data.result.package_loc;
      delivery_status.value = data.result.delivery_status_id;

      // ======= dom inserts goes ends here =======
    })
    .catch((error) => {
      // Log the error to console
      console.error("Error fetching tracking details:", error);
      alert("Error fetching tracking details. Please try again later.");
    });
}

// =========================================================
// =========================================================
// =========================================================
// =========================================================
// =========================================================
// =========================================================
// =========================================================
// =========================================================
// =========================================================
// =========================================================

// Manage total cost calculation
calculateTotalCost();

service_price.addEventListener("change", calculateTotalCost);
service_price.addEventListener("focus", () => {
  service_price.value = "";
});

delivery_price.addEventListener("change", calculateTotalCost);
delivery_price.addEventListener("focus", () => {
  delivery_price.value = "";
});

function calculateTotalCost() {
  let tcost =
    parseFloat(service_price.value) + parseFloat(delivery_price.value);
  console.log(tcost);
  console.log(new Intl.NumberFormat().format(tcost));

  totalCostElement.value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(tcost);
  // totalCostElement.value = "N" + tcost.toFixed(2)
}

delivery_type.addEventListener("change", showDeliveryCostInput);

function showDeliveryCostInput() {
  if (delivery_type.value == 0) {
    delCostDiv.style.display = "none";
    delivery_price.value = 0;
    calculateTotalCost();
  } else {
    delCostDiv.style.display = "block";
  }
}
