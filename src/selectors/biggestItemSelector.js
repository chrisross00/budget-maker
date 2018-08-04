export default (expenses) => {
  let holder = []
  for (let i = 0; i < expenses.length; i++) {
    holder.push(
      expenses[i].amount
    );
  }
  const maxValue = Math.max(...holder);
  let biggestExpenses = []
  expenses.filter((expense) =>
    parseFloat(expense.amount) === maxValue
      ? biggestExpenses.push({
        amount: expense.amount,
        expenseCategory: expense.expenseCategory,
        expenseCategoryId: expense.expenseCategoryId
      })
      : false);
  return biggestExpenses;
}
