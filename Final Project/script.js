const nameElement = document.getElementById("name");

// Check if the user is logged in
const loggedInUser = sessionStorage.getItem("loggedInUser");

if (loggedInUser) {
  const user = JSON.parse(loggedInUser);
  const userName = user.name; // Replace this with the variable containing the user's name
  nameElement.textContent = `Welcome, ${userName}`;
} else {
  // If not logged in, you might want to redirect the user to the login page
  window.location.href = "index.html"; // Update this with your actual login page URL
}

var loader = document.getElementById("preloader");
window.addEventListener("load",function(){
    loader.style.display="none";

})

// Get the canvas element
const chartCanvas = document.getElementById('myChart');

// Retrieve transactions from localStorage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Prepare data for the chart
const withdrawalCategories = {}; // Object to hold withdrawal categories and their totals

// Calculate withdrawal category totals
localStorageTransactions.forEach(transaction => {
    if (transaction.amount < 0) {
        const category = transaction.text;
        if (withdrawalCategories[category]) {
            withdrawalCategories[category] += Math.abs(transaction.amount);
        } else {
            withdrawalCategories[category] = Math.abs(transaction.amount);
        }
    }
});

const labels = Object.keys(withdrawalCategories);
const data = Object.values(withdrawalCategories);

// Generate random colors for the chart
const colors = generateRandomColors(labels.length);

// Create the pie chart
const ctx = chartCanvas.getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: colors,
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Adjust as needed
    },
});

// Function to generate random colors
function generateRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Generate a random hex color
        colors.push(randomColor);
    }
    return colors;
}


const totalBalanceElement = document.getElementById('total-balance');
const withdrawalElement = document.getElementById('total-withdrawals');
const depositElement = document.getElementById('total-deposits');



let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function calculateTotals() {
    const amounts = transactions.map(transaction => transaction.amount);

    const totalBalance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    const withdrawalTotal = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);
    
    const depositTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    totalBalanceElement.innerText = `$${totalBalance}`;
    withdrawalElement.innerText = `$${withdrawalTotal}`;
    depositElement.innerText = `$${depositTotal}`;
}

calculateTotals();


document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTodoButton = document.getElementById("add-todo");
  const todoList = document.querySelector(".balance");

  // Retrieve tasks from localStorage and display them
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task);
  });

  // Add a new task when the "Add" button is clicked
  addTodoButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
      const task = {
        id: Date.now(),
        text: taskText,
      };
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      createTaskElement(task);
      todoInput.value = "";
    }
  });

  // Create a new task element and append it to the list
  function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
      <span style="color:black;  border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;">${task.text}</span>
      <button class="delete-task" data-id="${task.id}">Delete</button>
    `;
    todoList.appendChild(taskElement);

    // Delete a task when the "Delete" button is clicked
    const deleteButton = taskElement.querySelector(".delete-task");
    deleteButton.addEventListener("click", () => {
      const taskId = task.id;
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskElement.remove();
      }
    });
  }
});
