const urlParams = new URLSearchParams(window.location.search);
const trackingNumber = urlParams.get('trackingNumber');

fetch(`/api/shipments/${trackingNumber}`)
  .then(response => response.json())
  .then(data => {
    document.getElementById('tracking-number').textContent = data.trackingNumber;
    document.getElementById('sender-name').textContent = data.senderName;
    document.getElementById('sender-address').textContent = data.senderAddress;
    document.getElementById('recipient-name').textContent = data.recipientName;
    document.getElementById('recipient-address').textContent = data.recipientAddress;
    document.getElementById('package-weight').textContent = data.packageWeight;
    document.getElementById('package-length').textContent = data.packageLength;
    document.getElementById('package-width').textContent = data.packageWidth;
    document.getElementById('package-height').textContent = data.packageHeight;
    document.getElementById('status').textContent = data.status;
    document.getElementById('created-at').textContent = new Date(data.createdAt).toLocaleString();
    document.getElementById('updated-at').textContent = new Date(data.updatedAt).toLocaleString();
  })
  .catch(error => {
    console.error('Error fetching shipment data:', error);
    alert('An error occurred while fetching the shipment data. Please try again later.');
  });