// Login logic goes here

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const logCredentials = {
    username: form.username.value,
    password: form.password.value,
  };

  const userData = {
    method: "POST",
    cors: "no-cors",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(logCredentials)
  };

  // Write the fetch request below
  console.log("submitted")
});
