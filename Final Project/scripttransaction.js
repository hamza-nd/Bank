var loader = document.getElementById("preloader");
window.addEventListener("load",function(){
    loader.style.display="none";

})

const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
            timestamp: new Date().toLocaleString() // Add a timestamp here
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues()

        updateLocalStorage()

        text.value = ''
        amount.value = ''
    }
}

//generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//Add transactions to DOM list
function addTransactionDOM(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
    sessionStorage.setItem('transactionData', JSON.stringify(transactions));
}

//update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

//update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues()
}

init();
form.addEventListener('submit', addTransaction);

// Add this section after your existing JavaScript code
const sendForm = document.getElementById('send-form');
const recipientName = document.getElementById('recipient-name');
const accountNumber = document.getElementById('account-number');
const sendAmount = document.getElementById('send-amount');

// Send money
function sendMoney(e) {
    e.preventDefault();

    if (recipientName.value.trim() === '' || accountNumber.value.trim() === '' || sendAmount.value.trim() === '') {
        alert('Please fill in all fields');
    } else {
        const transaction = {
            id: generateID(),
            text: `Sent to ${recipientName.value}`,
            amount: -parseFloat(sendAmount.value),
            timestamp: new Date().toLocaleString() // Add a timestamp here
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        recipientName.value = '';
        accountNumber.value = '';
        sendAmount.value = '';
    }
}

sendForm.addEventListener('submit', sendMoney);
