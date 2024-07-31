const createShipmentForm = document.getElementById("create-shipment-form");
const delivery_price = document.getElementById("delivery_price");

createShipmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const shipmentData = {
    description: formData.get("pack_desc"),
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
    delivery_price: formData.get("delivery_cost"),
    comment: formData.get("comment"),
  };

  console.log(shipmentData);

  const apiurl = `${location.protocol}//${location.hostname}/api`;

  const createConfig = {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(shipmentData),
  };

  fetch(`${apiurl}/packageapi/createpackage.php`, createConfig)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      alert(data.message);
      location.href = "./admin.html";
    })
    .catch((err) => console.log(err));
});

// Manage total cost calculation

const shippingCostInput = document.getElementById("shipping_cost");
const deliveryTypeInput = document.getElementById("delivery_type");
const deliveryCostInput = document.getElementById("delivery_cost");
const delCostDiv = document.getElementById("del_cost_div");
const totalCostElement = document.getElementById("total_cost");

shippingCostInput.addEventListener("change", calculateTotalCost);
shippingCostInput.addEventListener("focus", () => {
  shippingCostInput.value = "";
});

deliveryCostInput.addEventListener("change", calculateTotalCost);
deliveryCostInput.addEventListener("focus", () => {
  deliveryCostInput.value = "";
});

function calculateTotalCost() {
  tcost =
    parseFloat(shippingCostInput.value) + parseFloat(deliveryCostInput.value);
  //console.log(tcost);
  //console.log(new Intl.NumberFormat().format(tcost))

  totalCostElement.value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(tcost);
  // totalCostElement.value = "N" + tcost.toFixed(2)
}

deliveryTypeInput.addEventListener("change", showDeliveryCostInput);

function showDeliveryCostInput() {
  if (deliveryTypeInput.value == 0) {
    delCostDiv.style.display = "none";
    deliveryCostInput.value = 0;
    calculateTotalCost();
  } else {
    delCostDiv.style.display = "block";
  }
}
