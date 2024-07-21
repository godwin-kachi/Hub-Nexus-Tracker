const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const trackingNumber = urlParams.get('trackingNumber');

fetch(`/api/shipments/${trackingNumber}`)
  .then(response => response.json())
  .then(shipment => {
    const form = document.getElementById('edit-shipment-form');
    form.elements['tracking-number'].value = shipment.trackingNumber;
    form.elements['sender-name'].value = shipment.senderName;
    form.elements['sender-address'].value = shipment.senderAddress;
    form.elements['recipient-name'].value = shipment.recipientName;
    form.elements['recipient-address'].value = shipment.recipientAddress;
    form.elements['package-weight'].value = shipment.packageWeight;
    form.elements['package-length'].value = shipment.packageLength;
    form.elements['package-width'].value = shipment.packageWidth;
    form.elements['package-height'].value = shipment.packageHeight;
  })
  .catch(error => {
    console.error('Error fetching shipment data:', error);
    alert('An error occurred while loading the shipment data. Please try again later.');
  });

const editShipmentForm = document.getElementById('edit-shipment-form');
editShipmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const updatedShipment = {
    trackingNumber: formData.get('tracking-number'),
    senderName: formData.get('sender-name'),
    senderAddress: formData.get('sender-address'),
    recipientName: formData.get('recipient-name'),
    recipientAddress: formData.get('recipient-address'),
    packageWeight: parseFloat(formData.get('package-weight')),
    packageLength: parseFloat(formData.get('package-length')),
    packageWidth: parseFloat(formData.get('package-width')),
    packageHeight: parseFloat(formData.get('package-height'))
  };

  try {
    const response = await fetch(`/api/shipments/${updatedShipment.trackingNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedShipment)
    });

    if (response.ok) {
      alert('Shipment updated successfully!');
    } else {
      const errorData = await response.json();
      alert(`Error updating shipment: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error updating shipment:', error);
    alert('An error occurred while updating the shipment. Please try again later.');
  }
});

