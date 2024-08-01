// Display an error message if any
const row = document.getElementById("shipment_table");
const verifier = JSON.parse(sessionStorage.getItem("admintracker"));


const apiurl = `${location.protocol}//${location.hostname}/api`;
const pac_status = [
  "Order Processed",
  "Order Shipped",
  "Order Arrived",
  "Order Completed",
];


const totalPackages = document.getElementById("total_packages");
const totalProcessing = document.getElementById("total_processing");
const totalShipped = document.getElementById("total_shipped");
const totalArrived = document.getElementById("total_arrived");
const totalCompleted = document.getElementById("total_completed");
const deliveryRate = document.getElementById("delivery_rate");
const totalRevenue = document.getElementById("total_revenue");

const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get("message");

if (message != null) {
  // document.getElementById("mes_notification").textContent = message;
  alert(message);
  window.location.href = "admin.html";
}

// Page auth protector
// if (!verifier) {
//   window.location.href = "../admin/admin-login.html";
// }



// Fetch all shipments from the API
fetch(`${apiurl}/packageapi/getpackages.php`)
  .then((response) => response.json())
  .then((shipments) => {
    // Display shipments in the table
    row.innerHTML = "";
    shipments.result.forEach((shipment) => {
      // sampleData.forEach((shipment) => {

      row.innerHTML += `
          <td id="p_id">${shipment.package_id}</td>
           <td id="p_tno">${shipment.tracking_no}</td>
          <td id="p_desc">${shipment.description}</td>
          <td id="p_qty">${shipment.quantity}</td>
          <td id="p_cus_name">${shipment.sender_name}</td>
          <td id="p_ship_date">${shipment.created_at}</td>
          <td id="p_del_loc">${shipment.delivery_loc}</td>
          <td id="p_ship_cost">${shipment.service_price}</td>
          
          <td id="p_ship_status">${pac_status[shipment.delivery_status]}</td>
          <td>

            <a href="view-shipment.html?vmode=1&package_id=${shipment.package_id}" class="btn btn-primary py-0 pb-1">View</a>
            <a href="view-shipment.html?vmode=2&package_id=${shipment.package_id}" class="btn btn-primary py-0 pb-1">Edit</a>
            <button type="button" class="btn btn-danger p-0" id="delbtn">

              Del
            </button>
          </td>
      `;

      document.getElementById("delbtn").addEventListener("click", () => {

        if (confirm("Are you sure you want to delete this package?")) {
          delShipment(1);
        }

      });
    });

    // Update scoreboards
    totalPackages.textContent = shipments.result.length;
    totalProcessing.textContent = sampleData.filter(
      (s) => s.delivery_status === "0"
    ).length;
    totalShipped.textContent = shipments.result.filter(
      (s) => s.delivery_status === "1"
    ).length;
    totalArrived.textContent = shipments.result.filter(
      (s) => s.delivery_status === "2"
    ).length;
    totalCompleted.textContent = shipments.result.filter(
      (s) => s.delivery_status === "3"
    ).length;
    deliveryRate.textContent = `${Math.round(
      (parseFloat(totalShipped.textContent) /
        parseFloat(totalPackages.textContent)) *
        100
    )}%`;

    totalRevenue.textContent = `N${shipments.result
      .reduce((acc, cur) => acc + cur.service_price, 0)
      .toFixed(2)}`;
    totalProcessing.textContent = sampleData.filter(
      (s) => s.delivery_status === "0"
    ).length;
    totalShipped.textContent = shipments.result.filter(
      (s) => s.delivery_status === "1"
    ).length;
    totalArrived.textContent = shipments.result.filter(
      (s) => s.delivery_status === "2"
    ).length;
    totalCompleted.textContent = shipments.result.filter(
      (s) => s.delivery_status === "3"
    ).length;
    deliveryRate.textContent = `${Math.round(
      (parseFloat(totalShipped.textContent) /
        parseFloat(totalPackages.textContent)) *
        100
    )}%`;

    let tsprice = shipments.result.reduce(
      (acc, cur) =>
        acc + (cur.service_price ? parseFloat(cur.service_price) : 0),
      0
    );
    let tdprice = shipments.result.reduce(
      (acc, cur) =>
        acc + (cur.delivery_price ? parseFloat(cur.delivery_price) : 0),
      0
    );
    totalRevenue.textContent = "N" + (tsprice + tdprice).toLocaleString();
  })
  .catch((error) => console.error("Error:", error));

// ===============================================================
// ======== Delete Package Handler =========
function delShipment(pid) {
  console.log(`Deleting package with id: ${pid}`);

  fetch(`${apiurl}/packageapi/deletepackages.php?packageid=${pid}`)
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
    console.log(data);
    alert(data);
  })
  .catch((error) => {
    // Log the error to console
    console.error("Error fetching tracking details:", error);
    alert(
      "Error fetching tracking details. Please try again later. (Status 23)"
    );
  });
}


// Test code: remove in production
// document.getElementById("delbtn").addEventListener("click", () => {
//   if (confirm("Are you sure you want to delete this package?")) {
//     delShipment(1);
//   }
// });
