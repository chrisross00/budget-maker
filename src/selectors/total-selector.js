export default (expenses, multiplier = 1) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return expenses
    .map((expense) => expense.multiplier ? parseFloat(expense.amount * expense.multiplier)
      : parseFloat(expense.amount))
    .reduce(reducer, 0) * multiplier;
}
