import numeral from 'numeral';

const formatInUsd = (amount) => {
  return numeral(parseFloat(amount)).format('$0,0.00');
}

export default formatInUsd
