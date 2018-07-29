const expenses = [
  {
    expenseType: 1,
    expenseCategory: "Rent",
    expenseCategoryId: 1,
    amount: "700"
  },

  { expenseType: 1, expenseCategory: "Food", expenseCategoryId: 2, amount: "1000" },

  { expenseType: 1, expenseCategory: "Utilities", expenseCategoryId: 3, amount: "150" },

  { expenseType: 1, expenseCategory: "Cell Phone", expenseCategoryId: 4, amount: "50" },

  { expenseType: 1, expenseCategory: "Gym", expenseCategoryId: 5, amount: "50" },

  { expenseType: 1, expenseCategory: "TV", expenseCategoryId: 6, amount: "1000" },

  { expenseType: 1, expenseCategory: "Internet", expenseCategoryId: 7, amount: "70" },
  { expenseType: 1, expenseCategory: "Transport", expenseCategoryId: 8, amount: "85" }
]

const getBiggestItem = (expenses) => {
  let holder = []
  for (let i = 0; i < expenses.length; i++) {
    holder.push(
      expenses[i].amount
    );
  }
  const maxValue = Math.max(...holder);
  let otherArray = []
  expenses.filter((expense) =>
    parseFloat(expense.amount) === maxValue
      ? otherArray.push({ amount: expense.amount, expenseCategory: expense.expenseCategory })
      : false);

  for (let i = 0; i < otherArray.length; i++) {
    console.log(otherArray[i]);
  }
  console.log('otherArray length: ', otherArray.length);
  return maxValue;
}

console.log('getBiggestItem: ', getBiggestItem(expenses));
