export default (expenses) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return expenses
    .map((expense) => parseFloat(expense.normalAmount))
    .reduce(reducer, 0);
}
