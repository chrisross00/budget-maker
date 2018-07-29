export default (expenses, multiplier = 1) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return expenses
    .map((expense) => parseFloat(expense.amount))
    .reduce(reducer, 0) * multiplier;
}
