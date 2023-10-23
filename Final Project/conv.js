var loader = document.getElementById("preloader");
window.addEventListener("load",function(){
    loader.style.display="none";

})



const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;

let myChart;

const checkValues = () => {
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  if (!loanAmountValue.match(regexNumber)) {
    loanAmountInput.value = "10000";
  }

  if (!loanTenureValue.match(regexNumber)) {
    loanTenureInput.value = "12";
  }

  let regexDecimalNumber = /^(\d*\.)?\d+$/;
  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = "7.5";
  }
};

const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#e63946", "#14213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 12 / 100;
};

const calculateEMI = () => {
  checkValues();
  refreshInputValues();
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));

  return emi;
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmount = Math.round(loanTenure * emi);
  totalAmountValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  if (myChart) {
    updateChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable);
  }
};

const init = () => {
  let emi = calculateEMI();
  updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);


const currencyElement_one = document.getElementById('currency-one');
const currencyElement_two = document.getElementById('currency-two');
const amountElement_one = document.getElementById('amount-one');
const amountElement_two = document.getElementById('amount-two');
const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');
const resetButton = document.getElementById('reset');

// Define a function to calculate exchange rates and perform currency conversion
function calculate() {
    // Get the selected currencies from the dropdowns
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;

    // Start fetching exchange rate data from the API
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => {
        // Check if the response status is not OK (e.g., 404 or 500 error)
        if (!res.ok) {
            // Throw an error to be caught in the next 'catch' block
            throw new Error('Unable to fetch exchange rates. Please try again later.');
        }
        // If response is OK, parse the response as JSON and return it
        return res.json();
    })
    .then(data => {
        // Get the exchange rate for the selected target currency
        const rate = data.rates[currency_two];
        
        // Calculate the converted amount using the exchange rate
        amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
        
        // Update the rate display element with the exchange rate information
        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
    })
    .catch(error => {
        // If any error occurs in the above promise chain, handle it here
        rateElement.innerText = ''; // Clear the rate display
        amountElement_two.value = ''; // Clear the converted amount
        console.error(error); // Log the error to the console for debugging
        alert('An error occurred. Please try again later.'); // Show an error alert to the user
    });
}



// Add event listeners to trigger to convert the new currency from the drop down or when the user changes the numbers
currencyElement_one.addEventListener('change', calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_one.addEventListener('input', calculate);
amountElement_two.addEventListener('input', calculate);

// Add functionality to the "Swap" button
swap.addEventListener('click', function() {
    // Swap selected currencies
    const temp = currencyElement_one.value;
    currencyElement_one.value = currencyElement_two.value;
    currencyElement_two.value = temp;
    // Recalculate based on the newly selected currencies
    calculate();
});

// Perform initial calculation when the page loads
calculate();

// Define a function to reset the conversion fields
function resetFields() {
    amountElement_one.value = 0; // Reset the first amount to 0
    amountElement_two.value = ""; // Clear the second amount
    rateElement.innerText = ""; // Clear the rate display
}

resetButton.addEventListener('click', resetFields);

