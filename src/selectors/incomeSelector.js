// should return true if the expenses array has an expense w/the categoryId
// should return false if the expenses array doesn't

export default (incomes, description) => {
  return incomes.filter((income) =>
    income.description === description
      ? true
      : false
  );
}
