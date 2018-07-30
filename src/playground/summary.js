import getTotal from './selectors/total-selector';

export default (income, expenses, goals) => {
  const totalMonthlyIncome = parseFloat(getTotal(income, 2));
  const totalCostOfLiving = parseFloat(getTotal(expenses));
  const totalGoalContribution = parseFloat(getTotal(goals));
  const startingCash = parseFloat(goals.map((goal) => goal.startingCash))
  const netWorth = totalMonthlyIncome + startingCash;
  const totalCash = totalMonthlyIncome - totalCostOfLiving - totalGoalContribution;
  const cashAsPercent = (Math.round((totalCash) / (totalMonthlyIncome))) * 100;
  return ({
    totalMonthlyIncome: totalMonthlyIncome,
    netWorth: netWorth,
    totalCostOfLiving: totalCostOfLiving,
    totalGoalContribution: totalGoalContribution,
    totalCash: totalCash,
    startingCash: startingCash,
    cashAsPercent: cashAsPercent, //this is fucked up

  })
}
