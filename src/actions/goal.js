import uuid from 'uuid';

export const addGoal = (
  {
    description = '',
    target = '',
    amount = 0,
    projection = '',
    difference = 0,
    contributableAmount = 0,
    savings = 0
  } = {}
) => {
  return {
    type: 'ADD_GOAL',
    goal: {
      id: uuid(),
      description,
      target,
      amount,
      projection,
      difference,
      contributableAmount,
      savings
    }
  };
};
