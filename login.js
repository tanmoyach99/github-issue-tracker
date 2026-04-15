const userName = document.getElementById("userName");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

const loginSection = document.getElementById("login");
const githubSection = document.getElementById("github");

submit.addEventListener("click", function (e) {
  e.preventDefault();

  const usernameValue = userName.value.trim().toLowerCase();
  const passwordValue = password.value.trim();

  if (usernameValue === "admin" && passwordValue === "admin123") {
    // success login
    loginSection.classList.add("hidden");
    githubSection.classList.remove("hidden");

    console.log("Login successful");
  } else {
    // failed login
    alert("Invalid username or password");

    loginSection.classList.remove("hidden");
    githubSection.classList.add("hidden");
  }
});
