import uuid from 'uuid';
import database from '../firebase/firebase';

export const addGoal = (goal) => {
  return {
    type: 'ADD_GOAL',
    goal
  };
};

export const startAddGoal = (goalData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      target = '',
      amount = 0,
      projection = '',
      difference = 0,
      contributableAmount = 0,
      savings = 0,
      timeToHitGoal = ''
    } = goalData;
    const goal = { description, target, amount, projection, difference, contributableAmount, savings, timeToHitGoal };
    return database.ref(`users/${uid}/goals`).push(goal).then((ref) => {
      dispatch(addGoal({
        id: ref.key,
        ...goal
      }));
    })
  }
}

export const setGoals = (goals) => ({
  type: 'SET_GOALS',
  goals
})

export const startSetGoals = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/goals`).once('value').then((snapshot) => {
      const goals = [];
      snapshot.forEach((childSnapshot) => {
        goals.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setGoals(goals))
    })
  }
}
