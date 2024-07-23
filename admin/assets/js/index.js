const verifier = JSON.parse(sessionStorage.getItem("admin"));

if (!verifier) {
  window.location.href = "../admin/admin-login.html";
}

// Rest of the admin dashboard code goes here...
const url = "";

// Fetch all shipments from the API
fetch(url)
  .then((response) => response.json())
  .then((shipments) => {
    // Display shipments in the table
    let counter = 1;
    const row = document.getElementById("shipment_table");
    row.innerHTML = "";
    shipments.forEach((shipment) => {
      let output = `
      <td>${counter++}</td>
        <td>${shipment.customer_name}</td>
        <td>${shipment.shipping_address}</td>
        <td>${shipment.contact_information}</td>
        <td>${shipment.items}</td>
        <td>${shipment.shipping_method}</td>
        <td>
          <a href="edit-shipment.html?tracking_id=${shipment.tracking_id}">${
        shipment.tracking_id
      }</a> |
        </td>
        <td>${shipment.shipping_date}</td>
        <td>${shipment.delivery_date}</td>
        <td>${shipment.shipping_cost}</td>
        <td>${shipment.shipping_status.slice(
          -1
        )}</td> //A logic controlling this is not written yet
        <td>${shipment.shipping_notes}</td>
      `;
      row.insertAdjacentHTML("beforeend", output);
    });
  })
  .catch((error) => console.error("Error:", error));
