// should return true if the expenses array has an expense w/the categoryId
// should return false if the expenses array doesn't

export default (expenses, expenseCategoryId) => {
  return expenses.filter((expense) =>
    expense.expenseCategoryId === expenseCategoryId
      ? true
      : false
  );
}
