const registrationForm = document.querySelector("form");
const nameInput = registrationForm.querySelector('input[placeholder="Enter your name"]');
const emailInput = registrationForm.querySelector('input[placeholder="Enter your email"]');
const passwordInput = registrationForm.querySelector('input[placeholder="Create password"]');
const confirmPasswordInput = registrationForm.querySelector('input[placeholder="Confirm password"]');
const acceptTermsCheckbox = registrationForm.querySelector('.policy input[type="checkbox"]');
const registrationCompleteDiv = document.querySelector('.registration-complete');

function redirectToIndex() {
  window.location.href = "index.html";
}

function handleRegistration(event) {
  event.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!acceptTermsCheckbox.checked) {
    alert("Please accept the terms and conditions.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  // Get existing users from local storage or initialize an empty array
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the user already exists
  const userExists = storedUsers.some((user) => user.email === email);

  if (userExists) {
    alert("User with this email already exists.");
  } else {
    // Add new user to the list of users
    storedUsers.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Show the registration complete message
    registrationCompleteDiv.hidden = false;

    // Redirect to the login page after 2 seconds
    setTimeout(redirectToIndex, 2000);
  }
}

// Add event listener to the registration form submit button
registrationForm.addEventListener("submit", handleRegistration);