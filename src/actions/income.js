import uuid from 'uuid';
import database from '../firebase/firebase';

export const addIncome = (income) => ({
  type: 'ADD_INCOME',
  income
});

export const startAddIncome = (incomeData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      incomeType = '',
      incomeTypeId = 0,
      description = '',
      amount = 0,
      frequencyType = '',
      frequencyTypeId = 0,
      multiplier = 1
    } = incomeData;
    const income = { incomeType, incomeTypeId, description, amount, frequencyType, frequencyTypeId, multiplier };

    return database.ref(`users/${uid}/income`).push(income).then((ref) => {
      dispatch(addIncome({
        id: ref.key,
        ...income
      }))
    })
  }
}

export const updateIncome = (id, updates) => ({
  type: 'UPDATE_INCOME',
  id,
  updates
});

export const setIncome = (income) => ({
  type: 'SET_INCOME',
  income
})

export const startSetIncome = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/income`).once('value').then((snapshot) => {
      const income = [];
      snapshot.forEach((childSnapshot) => {
        income.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setIncome(income))
    })
  }
}
