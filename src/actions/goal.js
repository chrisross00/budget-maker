import uuid from 'uuid';

export const addGoal = (
  {
    name = '',
    target = '',
    monthlyRequiredAmount = 0,
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
      monthlyRequiredAmount,
      projection,
      difference,
      contributableAmount,
      startingCash
    }
  };
};
