var loader = document.getElementById("preloader");
window.addEventListener("load",function(){
    loader.style.display="none";

})

const list = document.getElementById('list');

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <div class="timestamp">${transaction.timestamp}</div> <!-- Display timestamp here -->
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}


function removeTransaction(id) {
    const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

    const updatedTransactions = localStorageTransactions.filter(transaction => transaction.id !== id);
    
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    loadTransactions();
}

// Load and display transactions on the History page
function loadTransactions() {
    const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

    if (localStorageTransactions) {
        list.innerHTML = '';
        localStorageTransactions.forEach(addTransactionDOM);
    }
}


// Call the loadTransactions function when the page loads
loadTransactions();
