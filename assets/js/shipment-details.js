const urlParams = new URLSearchParams(window.location.search);
const trackingNumber = urlParams.get("trackingNumber");

fetch(`/api/shipments/${trackingNumber}`)
  .then((response) => response.json())
  .then((shipment) => {
    if (!shipment) {
      alert("Invalid tracking number. Please check and try again.");
      window.location.href = "/tracking.html";
      return;
    }

    document.getElementById("tracking-number").textContent =
      shipment.trackingNumber;
    document.getElementById("sender-name").textContent =
      shipment.senderName;
    document.getElementById("sender-address").textContent =
      shipment.senderAddress;
    document.getElementById("recipient-name").textContent =
      shipment.recipientName;
    document.getElementById("recipient-address").textContent =
      shipment.recipientAddress;
    document.getElementById("package-weight").textContent =
      shipment.packageWeight + " kg";
    document.getElementById("package-length").textContent =
      shipment.packageLength + " cm";
    document.getElementById("package-width").textContent =
      shipment.packageWidth + " cm";
    document.getElementById("package-height").textContent =
      shipment.packageHeight + " cm";

    // Initialize the Google Maps API
    function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: {
          lat: shipment.latitude,
          lng: shipment.longitude,
        },
      });

      new google.maps.Marker({
        position: {
          lat: shipment.latitude,
          lng: shipment.longitude,
        },
        map: map,
        title: `Shipment Location: (${shipment.latitude}, ${shipment.longitude})`,
      });
    }

    initMap();
  })
  .catch((error) => {
    console.error("Error fetching shipment:", error);
    alert("An error occurred while fetching the shipment details.");
  });