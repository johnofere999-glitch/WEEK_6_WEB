// ======================================
// SPENDWISE WEEK 6
// ======================================


// Store expenses in an array
let expenses = [];


// Set the budget limit
const budgetLimit = 10000;


// Select HTML elements
const expenseForm = document.getElementById("expense-form");

const expenseName = document.getElementById("expense-name");

const amount = document.getElementById("amount");

const category = document.getElementById("category");

const totalExpenses = document.getElementById("total-expenses");

const expenseCount = document.getElementById("expense-count");

const budgetStatus = document.getElementById("budget-status");

const expenseList = document.getElementById("expense-list");

const feedback = document.getElementById("feedback");



// ======================================
// HANDLE FORM SUBMISSION
// ======================================

expenseForm.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();


    // Get information from the form
    const name = expenseName.value.trim();

    const expenseAmount = Number(amount.value);

    const expenseCategory = category.value;


    // Validate the information
    if (
        name === "" ||
        expenseAmount <= 0 ||
        expenseCategory === ""
    ) {

        feedback.textContent =
            "Please enter valid expense details.";

        return;
    }


    // Create an expense object
    const newExpense = {

        name: name,

        amount: expenseAmount,

        category: expenseCategory

    };


    // Add the expense to the array
    expenses.push(newExpense);


    // Display success message
    feedback.textContent =
        "Expense added successfully!";


    // Update the dashboard
    updateDashboard();


    // Clear the form
    expenseForm.reset();

});



// ======================================
// UPDATE DASHBOARD
// ======================================

function updateDashboard() {

    // Start total at zero
    let total = 0;


    // Loop through all expenses
    for (
        let i = 0;
        i < expenses.length;
        i++
    ) {

        total =
            total + expenses[i].amount;

    }


    // Update total expenses
    totalExpenses.textContent =
        `KES ${total.toFixed(2)}`;


    // Update number of expenses
    expenseCount.textContent =
        expenses.length;



    // ==================================
    // CONDITIONAL STATEMENTS
    // ==================================

    if (total === 0) {

        budgetStatus.textContent =
            "No expenses yet";

    }

    else if (total > budgetLimit) {

        budgetStatus.textContent =
            "Over budget";

    }

    else if (total >= budgetLimit * 0.8) {

        budgetStatus.textContent =
            "Approaching budget limit";

    }

    else {

        budgetStatus.textContent =
            "Within budget";

    }


    // Display all expenses
    displayExpenses();

}



// ======================================
// DISPLAY EXPENSES
// ======================================

function displayExpenses() {

    // Clear previous content
    expenseList.innerHTML = "";


    // If there are no expenses
    if (expenses.length === 0) {

        const message =
            document.createElement("p");

        message.textContent =
            "No expenses yet.";

        expenseList.appendChild(message);

        return;

    }


    // Loop through the expenses
    for (
        let i = 0;
        i < expenses.length;
        i++
    ) {

        const expense = expenses[i];


        // Create expense container
        const expenseItem =
            document.createElement("div");

        expenseItem.className =
            "expense-item";


        // Create information container
        const info =
            document.createElement("div");

        info.className =
            "expense-info";


        // Create expense name
        const name =
            document.createElement("strong");

        name.textContent =
            expense.name;


        // Create category
        const expenseCategory =
            document.createElement("small");

        expenseCategory.textContent =
            expense.category;


        // Create amount
        const expenseAmount =
            document.createElement("span");

        expenseAmount.className =
            "expense-amount";

        expenseAmount.textContent =
            `KES ${expense.amount.toFixed(2)}`;


        // Put the elements together
        info.appendChild(name);

        info.appendChild(expenseCategory);

        expenseItem.appendChild(info);

        expenseItem.appendChild(expenseAmount);


        // Add the expense to the webpage
        expenseList.appendChild(expenseItem);

    }

}



// ======================================
// RUN WHEN PAGE LOADS
// ======================================

updateDashboard();