console.log("js connected");

const userName = document.getElementById("userName");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    userName.value.trim().toLowerCase() === "admin" &&
    password.value.trim() === "admin123"
  ) {
    console.log(password.value);
    document.getElementById("login").style.display = "none";
    document.getElementById("github").style.display = "block";
  } else {
    document.getElementById("login").style.display = "block";
    document.getElementById("github").style.display = "none";
  }
});
