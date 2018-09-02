import database from '../firebase/firebase';

export const updateProgress = (updates) => ({
  type: 'UPDATE_PROGRESS',
  updates
})

export const startUpdateProgress = (updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/progress/`).update(updates).then(() => {
      dispatch(updateProgress(updates))
    })
  }
}

export const setProgress = (progress) => ({
  type: 'SET_PROGRESS',
  progress
})

export const startSetProgress = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/progress`).once('value').then((snapshot) => {
      dispatch(setProgress(snapshot.val()))
    })
  }
}
