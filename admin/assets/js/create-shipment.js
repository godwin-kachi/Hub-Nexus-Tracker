const createShipmentForm = document.getElementById('create-shipment-form');

createShipmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const shipmentData = {
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
    const response = await fetch('/api/shipments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shipmentData)
    });

    if (response.ok) {
     
      alert('Shipment created successfully!');
    } else {
      const errorData = await response.json();
      alert(`Error creating shipment: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error creating shipment:', error);
    alert('An error occurred while creating the shipment. Please try again later.');
  }
});
