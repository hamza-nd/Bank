const loginForm = document.getElementById("loginForm");
const emailInput = loginForm.querySelector('input[type="text"]');
const passwordInput = loginForm.querySelector('input[type="password"]');

// Function to handle login
function handleLogin(event) {
  event.preventDefault();

  // Get user data from local storage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const email = emailInput.value;
  const password = passwordInput.value;

  // Check if the user exists
  const user = storedUsers.find((user) => user.email === email && user.password === password);

  if (user) {
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    // Redirect to the main page (you can replace this URL with your actual main page)
    window.location.href = "main.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
}

// Add event listener to the form submit button
loginForm.addEventListener("submit", handleLogin);
