// Get the form and expense list elements from the DOM
const form = document.querySelector('form');
const expenseList = document.querySelector('#expenseList');

// Load expenses from local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Add an event listener to the form submit button
form.addEventListener('submit', event => {
  event.preventDefault();

  // Get the form input values
  const expenseAmount = parseFloat(event.target.expenseAmount.value);
  const description = event.target.description.value;
  const category = event.target.category.value;

  // Create a new expense object
  const expense = {
    id: Date.now(),
    expenseAmount,
    description,
    category
  };

  // Add the expense to the expenses array
  expenses.push(expense);

  // Update the expense list in the UI
  updateExpenseList(expenses);

  // Store the expenses array in local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Reset the form
  form.reset();
});

// Update the expense list in the UI
function updateExpenseList(expenses) {
  expenseList.innerHTML = '';

  expenses.forEach(expense => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${expense.expenseAmount}</td>
      <td>${expense.description}</td>
      <td>${expense.category}</td>
      <td>
        <button type="button" class="btn btn-primary" onclick="editExpense(${expense.id})">Edit</button>
        <button type="button" class="btn btn-danger" onclick="deleteExpense(${expense.id})">Delete</button>
      </td>
    `;
    expenseList.appendChild(tr);
  });
}

// Delete an expense from the expenses array and local storage
function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  updateExpenseList(expenses);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Edit an expense
function editExpense(id) {
  const expense = expenses.find(expense => expense.id === id);

  // Populate the form with the expense details
  form.expenseAmount.value = expense.expenseAmount;
  form.description.value = expense.description;
  form.category.value = expense.category;

  // Delete the expense from the expenses array and local storage
  deleteExpense(id);
}
