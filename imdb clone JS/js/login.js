const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const [email, pass] = e.target;
  if (email.value !== "abc@gmail.com" || pass.value !== "123456") {
    alert("Wrong email or pass");
    return;
  }
  localStorage.setItem("loggedIn", true);
  window.location.replace("/");
});
