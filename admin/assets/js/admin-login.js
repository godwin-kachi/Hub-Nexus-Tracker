// Login logic goes here

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = form.username.value;
  const password = form.password.value;
});
