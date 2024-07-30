const urlParams = new URLSearchParams(window.location.search);
const vmode = urlParams.get("vmode");
const package_id = urlParams.get("package_id");

const host_name = location.hostname;
const host_protocol = location.protocol;
const host_port = location.port;

// Redirect to tracking page if tracking number is null
if (
  package_id == null ||
  package_id.trim() == "" ||
  Number.isInteger(package_id) ||
  vmode == null ||
  vmode.trim() == "" ||
  Number.isInteger(package_id)
) {
  window.location.href =
    "./admin.html?message=" +
    "you went through the wrong route. You have to click the buttons.";
}

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

const edit_btn = document.getElementById("edit_btn");
const save_btn = document.getElementById("save_btn");
const edit_status_btn = document.getElementById("edit_status_btn");
const save_status_btn = document.getElementById("save_status_btn");
const edit_loc_btn = document.getElementById("edit_loc_btn");
const save_loc_btn = document.getElementById("save_loc_btn");
const cancel_btn = document.getElementById("cancel_btn");
const viewShipmentForm = document.getElementById("view-shipment-form");

const apiurl = `${location.protocol}//${location.hostname}/api`;

// =================================================================
// =========== Get Package Detials via API =========================
// =================================================================
displayTrackingDetails();

function displayTrackingDetails() {
  // Fetch tracking details from the API
  fetch(`${apiurl}/packageapi/getpackage.php?package_id=${package_id}`)
    .then(async (response) => {
      // Check if the response is not OK, then read as text
      if (!response.ok) {
        const text = await response.text();
        console.log(text, " response not ok status 22");
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
      //console.log(data);
      // Update the tracking information based on the API response
      pack_id.value = data.result.package_id;
      track_no.value = data.result.tracking_no;
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
      totalCostElement.value =
        parseFloat(service_price.value) + parseFloat(delivery_price.value);
      comment.value = data.result.comment;
      pack_created_at.value = data.result.created_at;
      pack_updated_at.value = data.result.updated_at;
      cur_loc.value = data.result.package_loc ?? data.result.sending_loc;
      delivery_status.value = data.result.delivery_status;

      // ======= dom inserts goes ends here =======
    })
    .catch((error) => {
      // Log the error to console
      console.error("Error fetching tracking details:", error);
      alert(
        "Error fetching tracking details. Please try again later. (Status 23)"
      );
    });
}

// =========================================================
// ====== Manage button actions ============================
// =========================================================

edit_btn.addEventListener("click", enablePackageInputs);
// save_btn.addEventListener("click");
edit_loc_btn.addEventListener("click", enableLocationInput);
edit_status_btn.addEventListener("click", enableStatusInput);
save_loc_btn.addEventListener("click", saveNewPackageLocation);
save_status_btn.addEventListener("click", saveNewPackageStatus);

// =========== Cancel button event HANDLER=================
cancel_btn.addEventListener("click", () => {
  if (host_name === "localhost" || host_name === "127.0.0.1") {
    location.href = `${host_protocol}//${host_name}:${host_port}/admin/view-shipment.html?vmode=1&package_id=${package_id}`;
  } else {
    location.href = `${host_protocol}//${host_name}/admin/view-shipment.html?vmode=1&package_id=${package_id}`;
  }
  //
});

// =================================================================
// ======== New Package Location Handler =======================
// =================================================================
function saveNewPackageLocation() {
  console.log("save package location");

  const locUpdateData = {
    update_mode: "update_location",
    package_id: pack_id.value,
    package_loc: cur_loc.value,
  };

  const locUpdateConfig = {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(locUpdateData),
  };

  // Fetch tracking details from the API
  fetch(`${apiurl}/packageapi/updatepackage.php`, locUpdateConfig)
    .then(async (response) => {
      // Check if the response is not OK, then read as text
      if (!response.ok) {
        const text = await response.text();
        console.log(text, " response not ok status 22");
        alert(text, " response not ok status 22");
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

      // action here
      console.log(data);
    })
    .catch((error) => {
      // Log the error to console
      console.error("Error fetching tracking details:", error);
      alert(
        "Error fetching tracking details. Please try again later. (Status 23)"
      );
    });
}
// =================================================================
// ========  New Package STATUS Handler =======================
// =================================================================

function saveNewPackageStatus() {
  console.log("save package status");

  const statusUpdateData = {
    update_mode: "update_status",
    package_id: pack_id.value,
    package_loc: delivery_status.value,
  };

  const statusUpdateConfig = {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(statusUpdateData),
  };

  // Fetch tracking details from the API
  fetch(`${apiurl}/packageapi/updatepackage.php`, statusUpdateConfig)
    .then(async (response) => {
      // Check if the response is not OK, then read as text
      if (!response.ok) {
        const text = await response.text();
        console.log(text, " response not ok status 22");
        alert(text, " response not ok status 22");
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

      // action here
      console.log(data);
    })
    .catch((error) => {
      // Log the error to console
      console.error("Error fetching tracking details:", error);
      alert(
        "Error fetching tracking details. Please try again later. (Status 23)"
      );
    });
}

// =================================================================
// ======== View Shipment Form Submit Handler =======================
// =================================================================
viewShipmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const shipmentData = {
    package_id: formData.get("pack_id"),
    decscription: formData.get("pack_desc"),
    quantity: formData.get("pack_qty"),
    sender_name: formData.get("sender_name"),
    sender_email: formData.get("sender_email"),
    sender_phone: formData.get("sender_phone"),
    sender_address: formData.get("sender_address"),
    receiver_name: formData.get("receiver_name"),
    receiver_email: formData.get("receiver_email"),
    receiver_phone: formData.get("receiver_phone"),
    receiver_address: formData.get("receiver_address"),
    sending_loc: formData.get("sending_loc"),
    delivery_loc: formData.get("delivery_loc"),
    service_price: formData.get("shipping_cost"),
    delivery_type: parseFloat(formData.get("delivery_type")),
    delivery_price: formData.get("delivery_price"),
    comment: formData.get("comment"),
  };

  console.log(shipmentData);

  const apiurl = `${host_protocol}//${host_name}/api`;

  const createConfig = {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(shipmentData),
  };

  fetch(`${apiurl}/packageapi/updatepackage.php`, createConfig)
    .then(async (response) => {
      // Check if the response is not OK, then read as text
      if (!response.ok) {
        const text = await response.text();
        alert(text);
        throw new Error(`Error response from server: ${text}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert(data.message);
    })
    .catch((err) => {
      console.log(err);
      console.log(err + " (Status 28)");
      alert(err.message);
    });
});

// ==========================================================
// =  Enable inputs if EDIT button is clicked from dasboard  =
// ==========================================================

if (vmode == 2) {
  enablePackageInputs();
}

// =========================================================
function enablePackageInputs() {
  pack_desc.disabled = false;
  pack_qty.disabled = false;

  sender_name.disabled = false;
  sender_email.disabled = false;
  sender_phone.disabled = false;
  sender_address.disabled = false;

  receiver_name.disabled = false;
  receiver_email.disabled = false;
  receiver_phone.disabled = false;
  receiver_address.disabled = false;

  sending_loc.disabled = false;
  delivery_loc.disabled = false;
  service_price.disabled = false;
  delivery_type.disabled = false;
  delivery_price.disabled = delivery_type.value == 0 ? true : false;

  comment.disabled = false;
  pack_created_at.disabled = false;
  pack_updated_at.disabled = false;

  save_btn.style.display = "block";
  cancel_btn.style.display = "block";
  edit_btn.style.display = "none";
  edit_status_btn.style.display = "none";
  save_status_btn.style.display = "none";
  edit_loc_btn.style.display = "none";
  save_loc_btn.style.display = "none";
}
// =========================================================
function enableLocationInput() {
  cur_loc.disabled = false;

  save_btn.style.display = "none";
  cancel_btn.style.display = "block";
  edit_btn.style.display = "none";
  edit_status_btn.style.display = "none";
  save_status_btn.style.display = "none";
  edit_loc_btn.style.display = "none";
  save_loc_btn.style.display = "block";
}
// =========================================================
function enableStatusInput() {
  delivery_status.disabled = false;

  save_btn.style.display = "none";
  cancel_btn.style.display = "block";
  edit_btn.style.display = "none";
  edit_status_btn.style.display = "none";
  save_status_btn.style.display = "block";
  edit_loc_btn.style.display = "none";
  save_loc_btn.style.display = "none";
}
// =========================================================
// =========================================================
// =========================================================
// =========================================================

// Manage total cost calculation
calculateTotalCost();

service_price.addEventListener("change", calculateTotalCost);
service_price.addEventListener("focus", () => {
  if (service_price.value === "0") {
    service_price.value = "";
  }
});

delivery_price.addEventListener("change", calculateTotalCost);
delivery_price.addEventListener("focus", () => {
  if (delivery_price.value === "0") {
    delivery_price.value = "";
  }
});

function calculateTotalCost() {
  let tcost =
    parseFloat(service_price.value) + parseFloat(delivery_price.value);

  if (isNaN(tcost)) {
    tcost = 0;
  }

  totalCostElement.value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(tcost);
  // totalCostElement.value = "N" + tcost.toFixed(2)
}

delivery_type.addEventListener("change", enableDeliveryCostInput);

// showDeliveryCostInput();
function enableDeliveryCostInput() {
  if (delivery_type.value == 0) {
    // delCostDiv.style.display = "none";
    delivery_price.disabled = true;
    delivery_price.value = 0;
  } else {
    delivery_price.disabled = false;
  }
  calculateTotalCost();
}
