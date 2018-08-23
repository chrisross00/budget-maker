import getTotal from '../selectors/total-selector';
import biggestItemSelector from '../selectors/biggestItemSelector';
import numeral from 'numeral';


// TODO: update so return in numerals
export default (income, expenses, goals, multiplier = 1) => {
  const totalMonthlyIncome = parseFloat(getTotal(income, multiplier));
  const totalCostOfLiving = parseFloat(getTotal(expenses));
  const totalGoalContribution = parseFloat(getTotal(goals));
  const savings = parseFloat(goals.map((goal) => goal.savings))
  const totalCash = parseFloat(totalMonthlyIncome - totalCostOfLiving - totalGoalContribution);
  const cashAsPercent = ((totalCash) / (totalMonthlyIncome)) * 100;
  const netWorth = totalCash + savings; // this should be the sume of totalCash + starting cash
  const biggestExpense = parseFloat(biggestItemSelector(expenses));
  return ({
    totalMonthlyIncome: totalMonthlyIncome,
    netWorth: netWorth,
    totalCostOfLiving: totalCostOfLiving,
    totalGoalContribution: totalGoalContribution,
    totalCash: totalCash,
    savings: savings,
    cashAsPercent: cashAsPercent,
    biggestExpense: biggestExpense
  });
}
