import uuid from 'uuid';

export const addGoal = (
  {
    name = '',
    target = '',
    amount = 0,
    projection = '',
    difference = 0,
    contributableAmount = 0,
    startingCash = 0
  } = {}
) => {
  return {
    type: 'ADD_GOAL',
    goal: {
      id: uuid(),
      name,
      target,
      amount,
      projection,
      difference,
      contributableAmount,
      startingCash
    }
  };
};
