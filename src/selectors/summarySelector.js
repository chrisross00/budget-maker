import getTotal from '../selectors/total-selector';
import biggestItemSelector from '../selectors/biggestItemSelector';
import numeral from 'numeral';


// TODO: update so return in numerals
export default (income, expenses, goals) => {
  const totalMonthlyIncome = parseFloat(getTotal(income, 2));
  const totalCostOfLiving = parseFloat(getTotal(expenses));
  const totalGoalContribution = parseFloat(getTotal(goals));
  const startingCash = parseFloat(goals.map((goal) => goal.startingCash))
  const totalCash = parseFloat(totalMonthlyIncome - totalCostOfLiving - totalGoalContribution);
  const cashAsPercent = ((totalCash) / (totalMonthlyIncome)) * 100;
  const netWorth = totalCash + startingCash; // this should be the sume of totalCash + starting cash
  const biggestExpense = parseFloat(biggestItemSelector(expenses));
  return ({
    totalMonthlyIncome: numeral(totalMonthlyIncome).format('$0,0.00'),
    netWorth: numeral(netWorth).format('$0,0.00'),
    totalCostOfLiving: numeral(totalCostOfLiving).format('$0,0.00'),
    totalGoalContribution: numeral(totalGoalContribution).format('$0,0.00'),
    totalCash: numeral(totalCash).format('$0,0.00'),
    startingCash: numeral(startingCash).format('$0,0.00'),
    cashAsPercent: numeral(cashAsPercent).format('$0,0.00'),
    biggestExpense: biggestExpense
  });
}
