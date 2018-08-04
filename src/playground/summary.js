import getTotal from './selectors/total-selector';

export default (income, expenses, goals) => {
  const totalMonthlyIncome = parseFloat(getTotal(income, 2));
  const totalCostOfLiving = parseFloat(getTotal(expenses));
  const totalGoalContribution = parseFloat(getTotal(goals));
  const savings = parseFloat(goals.map((goal) => goal.savings))
  const netWorth = totalMonthlyIncome + savings;
  const totalCash = totalMonthlyIncome - totalCostOfLiving - totalGoalContribution;
  const cashAsPercent = (Math.round((totalCash) / (totalMonthlyIncome))) * 100;
  return ({
    totalMonthlyIncome: totalMonthlyIncome,
    netWorth: netWorth,
    totalCostOfLiving: totalCostOfLiving,
    totalGoalContribution: totalGoalContribution,
    totalCash: totalCash,
    savings: savings,
    cashAsPercent: cashAsPercent, //this is fucked up

  })
}
