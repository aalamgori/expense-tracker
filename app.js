let form = document.getElementById("transactionForm");

let titleInput = document.getElementById("title");
let amountInput = document.getElementById("amount");
let typeInput = document.getElementById("type");
let categoryInput = document.getElementById("category");
let dateInput = document.getElementById("date");

let transactionList = document.getElementById("transactionList");

let balance = document.getElementById("balance");
let income  = document.getElementById("income");
let expense  = document.getElementById("expense");
let transactionCount  = document.getElementById("transactionCount");

let transactions = [];

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let title = titleInput.value.trim();
    let amount = Number(amountInput.value);
    let type = typeInput.value;
    let category = categoryInput.value;
    let date = dateInput.value;

    if (title === "") {
        alert("Please enter transaction title");
        return;
    }

    if (amount <= 0) {
        alert("Please enter valid amount");
        return;
    }

    if (type === "") {
        alert("Please select transaction type");
        return;
    }

    if (category === "") {
        alert("Please select category");
        return;
    }

    if (date === "") {
        alert("Please select date");
        return;
    }

    let transaction = {
        id: Date.now(),
        title: title,
        amount: amount,
        type: type,
        category: category,
        date: date
    };

    transactions.push(transaction);

    console.log(transactions);

    displayTransactions();

    updateSummary();

    form.reset();
});


function displayTransactions() {

    transactionList.innerHTML = "";

    if (transactions.length === 0) {

        transactionList.innerHTML = `
            <div class="text-center text-slate-500">

                <div class="text-4xl mb-2">
                    💳
                </div>

                <h3 class="font-semibold text-slate-800">
                    No transaction yet
                </h3>

                <p class="text-sm mt-1">
                    Add your first income or expense.
                </p>

            </div>
        `;

        return;
    }


    let latesttransaction = transactions.slice(-5).reverse();

    latesttransaction.forEach(function(transaction) {

        let transactionDiv = document.createElement("div");

        transactionDiv.className =
            "w-full flex items-center justify-between border border-slate-200 rounded-lg p-3 mb-3";

        let symbol;
        let amountcolor;

        if (transaction.type === "income") {
            symbol = "+";
            amountcolor = "text-green-600";
        } else {
            symbol = "-";
            amountcolor = "text-red-500";
        }

        transactionDiv.innerHTML = `
            <div>

                <h3 class="font-semibold text-slate-800">
                    ${transaction.title}
                </h3>

                <p class="text-sm text-slate-500">
                    ${transaction.category} • ${transaction.date}
                </p>

            </div>

            <div class="flex items-center gap-4">

                <span class="font-bold ${amountcolor}">
                    ${symbol} ₹${transaction.amount}
                </span>

                <button
                    onclick="deleteTransaction(${transaction.id})"
                    class="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200"
                >
                    Delete
                </button>

            </div>
        `;

        transactionList.appendChild(transactionDiv);

    });
}


function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            totalIncome = totalIncome + transaction.amount;
        } else {
            totalExpense = totalExpense + transaction.amount;
        }

    });

    let totalBalance = totalIncome - totalExpense;

    income.textContent = "₹" + totalIncome;
    expense.textContent = "₹" + totalExpense;
    balance.textContent = "₹" + totalBalance;
    transactionCount.textContent = transactions.length;
}






function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {

        return transaction.id !== id;

    });

    console.log(transactions);

    displayTransactions();

     updateSummary();
}