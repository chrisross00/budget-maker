export const defaultprogress = {
  showIncome: true,
  showExpenses: false,
  showGoals: false,
  setupDone: false
}

export default (state = defaultprogress, action) => {
  switch (action.type) {
    case 'UPDATE_PROGRESS':
      return {
        ...action.updates
      }
    case 'SET_PROGRESS':
      if (action.progress) { return { ...action.progress } }
      else { return state }
    default:
      return state
  }
}
