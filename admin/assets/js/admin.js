const row = document.getElementById("shipment_table");

const verifier = JSON.parse(sessionStorage.getItem("admintracker"));

// Page auth protector
// if (!verifier) {
//   window.location.href = "../admin/admin-login.html";
// }
const apiurl = `${location.protocol}//${location.hostname}/api`;
const pac_status = ["Order Processed", "Order Shipped", "Order Arrived", "Order Completed"]

// Fetch all shipments from the API
fetch(`${apiurl}/packageapi/getpackages.php`)
.then((response) => response.json())
  .then((shipments) => {

    // Display shipments in the table
    row.innerHTML = "";
    shipments.result.forEach((shipment) => {
            
      row.innerHTML += `
          <td id="p_id">${shipment.package_id}</td>
           <td id="p_tno">${shipment.tracking_no}</td>
          <td id="p_desc">${shipment.description}</td>
          <td id="p_qty">${shipment.quantity}</td>
          <td id="p_cus_name">${shipment.sender_name}</td>
          <td id="p_ship_date">${shipment.created_at}</td>
          <td id="pdel_date">${shipment.delivery_loc}</td>
          <td id="p_ship_cost">${shipment.service_price}</td>
          <td id="p_cur_loc">${shipment.sending_loc}</td>
          <td id="p_ship_status">${pac_status[shipment.delivery_status]}</td>
          <td>
            <a href="view-shipment.html?package_id=${shipment.package_id}" class="btn btn-primary py-0 pb-1">View</a>
            <a href="edit-shipment.html?package_id=${shipment.package_id}" class="btn btn-primary py-0 pb-1">Edit</a>
            <button type="button" class="btn btn-danger p-0" onclick="deleteShipment(${shipment.package_id})">
              Del
            </button>
          </td>
      `;
    });
  })
  .catch((error) => console.error("Error:", error));
