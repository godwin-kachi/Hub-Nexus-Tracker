fetch('getpackages.php')
.then(response => response.json())
.then(data => {
  const shipmentTbody = document.getElementById('shipment-tbody');

  data.forEach(shipment => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${shipment.trackingNumber}</td>
      <td>${shipment.sender}</td>
      <td>${shipment.recipient}</td>
      <td>${shipment.status}</td>
      <td>
        <a href="view-shipment.html?trackingNumber=${shipment.trackingNumber}" class="btn btn-primary btn-sm">View</a>
        <a href="edit-shipment.html?trackingNumber=${shipment.trackingNumber}" class="btn btn-secondary btn-sm">Edit</a>
        <button class="btn btn-danger btn-sm delete-btn" data-tracking-number="${shipment.trackingNumber}">Delete</button>
      </td>
    `;
    shipmentTbody.appendChild(row);
  });

  // Add event listener for delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteShipment);
  });
})
.catch(error => console.error('Error fetching shipments:', error));

// Function to delete a shipment
function deleteShipment(event) {
const trackingNumber = event.target.dataset.trackingNumber;

if (confirm(`Are you sure you want to delete the shipment with tracking number ${trackingNumber}?`)) {
  fetch(`/api/shipments/${trackingNumber}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // Remove the deleted row from the table
      event.target.closest('tr').remove();
      console.log(`Shipment with tracking number ${trackingNumber} deleted successfully.`);
    } else {
      console.error(`Error deleting shipment with tracking number ${trackingNumber}.`);
    }
  })
  .catch(error => {
    console.error('Error deleting shipment:', error);
  });
}
}