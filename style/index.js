function showForm() {
    document.getElementById("expenseForm").style.display = "block";
    document.getElementById("addBtnBox").style.display = "none";
}

function hideForm() {
    document.getElementById("expenseForm").style.display = "none";
    document.getElementById("addBtnBox").style.display = "block";
}

const addBtn = document.getElementById("addExpenseBtn");
let expenses = [];
const yearSelect = document.querySelector("select[name='year']");
yearSelect.addEventListener("change", renderExpenses);

addBtn.addEventListener("click", function () {
    const title = document.getElementById("ftitle").value.trim();
    const amount = document.getElementById("famount").value.trim();
    const date = document.getElementById("date").value;

    if (!title || !amount || !date) {
        alert("Please fill out all fields!");
        return;
    }

    const expenseData = {
        title,
        amount: parseFloat(amount),
        date: new Date(date)
    };

    expenses.push(expenseData);
    renderExpenses();
    hideForm();

    document.getElementById("ftitle").value = "";
    document.getElementById("famount").value = "";
    document.getElementById("date").value = "";
});

function updateMonthlyDiagram() {
    const selectedYear = parseInt(yearSelect.value);
    const filteredExpenses = expenses.filter(exp => exp.date.getFullYear() === selectedYear);

    let monthlyTotals = Array(12).fill(0);
    filteredExpenses.forEach(exp => {
        monthlyTotals[exp.date.getMonth()] += exp.amount;
    });

    const monthFills = document.querySelectorAll(".month-fill");
    const maxAmount = Math.max(...monthlyTotals, 1);

    monthFills.forEach((fill, index) => {
        let fillPercent = (monthlyTotals[index] / maxAmount) * 100;
        fill.style.height = `${fillPercent}%`;
    });
}

function renderExpenses() {
    const displayDiv = document.querySelector(".display-items");
    displayDiv.innerHTML = "";

    const selectedYear = parseInt(yearSelect.value);
    const filteredExpenses = expenses.filter(exp => exp.date.getFullYear() === selectedYear);

    if (filteredExpenses.length === 0) {
        displayDiv.innerHTML = `<p class= "no-expenses">Found no expenses.</p>`;
    } else {
        filteredExpenses.forEach(exp => {
            const expenseItem = document.createElement("div");
            expenseItem.classList.add("expense-item");

            const day = exp.date.getDate();
            const month = exp.date.toLocaleString("default", { month: "short" });
            const year = exp.date.getFullYear();

            expenseItem.innerHTML = `
              <div class="expense-date">
                <div class="expense-month">${month}</div>
                <div class="expense-year">${year}</div>
                <div class="expense-day">${day}</div>
              </div>
              <div class="expense-title">${exp.title}</div>
              <div class="expense-amount">$${exp.amount}</div>
            `;
            displayDiv.appendChild(expenseItem);
        });
    }

    updateMonthlyDiagram();
}
