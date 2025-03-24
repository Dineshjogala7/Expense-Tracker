let add_btn = document.querySelector("#add");
let tot = 0;
let orig = document.querySelector(".orig-data");
let vary = document.querySelector("#moneytot");

// Load saved expenses from localStorage
document.addEventListener("DOMContentLoaded", () => {
    let storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    storedExpenses.forEach(expense => {
        addExpenseToDOM(expense.name, expense.amount);
        tot += expense.amount;
    });
    vary.innerHTML = tot;
});

// Function to add expense to the DOM and localStorage
function addExpenseToDOM(expenseName, expenseAmount) {
    let data = document.createElement("div");
    let delbtn = document.createElement("button");
    data.className = "node";

    let exp = document.createElement("span");
    let amnt = document.createElement("span");
    exp.innerHTML = expenseName;
    amnt.innerHTML = expenseAmount;

    data.appendChild(exp);
    data.appendChild(amnt);
    data.appendChild(delbtn);
    orig.appendChild(data);

    delbtn.id = "delbt";
    delbtn.innerText = "DELETE";

    // Delete button event
    delbtn.addEventListener("click", () => {
        tot -= expenseAmount;
        orig.removeChild(data);
        updateLocalStorage(expenseName, expenseAmount);
        vary.innerHTML = tot;
        if (tot === 0) {
            vary.innerHTML = 0;
        }
    });

    // Store data in localStorage
    let storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    storedExpenses.push({ name: expenseName, amount: expenseAmount });
    localStorage.setItem("expenses", JSON.stringify(storedExpenses));
}

// Remove expense from localStorage
function updateLocalStorage(expenseName, expenseAmount) {
    let storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    storedExpenses = storedExpenses.filter(expense => !(expense.name === expenseName && expense.amount === expenseAmount));
    localStorage.setItem("expenses", JSON.stringify(storedExpenses));
}

// Add expense button event
add_btn.addEventListener("click", () => {
    let expense_name = document.querySelector("#expense");
    let money = document.querySelector("#amount");

    if (money.value === "" || expense_name.value === "") {
        alert("Value should not be empty");
        return;
    }

    let money_s = parseInt(money.value);
    let expense_names = expense_name.value;

    expense_name.value = "";
    money.value = "";

    tot += money_s;
    vary.innerHTML = tot;

    addExpenseToDOM(expense_names, money_s);
});
