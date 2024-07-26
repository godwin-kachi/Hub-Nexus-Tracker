const createShipmentForm = document.getElementById("create-shipment-form");
console.log(createShipmentForm);

createShipmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const shipmentData = {
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
    delivery_loc: formData.get("del_loc"),
    service_price: formData.get("shipping_cost"),
    delivery_type: parseFloat(formData.get("del_type")),
    comment: formData.get("comment"),
  };
  console.log(formData);
  console.log(shipmentData);

  const apiurl = `${location.protocol}//${location.hostname}/api`;

  // try {
  //   const response = await fetch(`${apiurl}/packageapi/createpackage`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(shipmentData)
  //   });

  //   if (response.ok) {

  //     alert('Shipment created successfully!');
  //   } else {
  //     const errorData = await response.json();
  //     alert(`Error creating shipment: ${errorData.message}`);
  //   }
  // } catch (error) {
  //   console.error('Error creating shipment:', error);
  //   alert('An error occurred while creating the shipment. Please try again later.');
  // }
});
