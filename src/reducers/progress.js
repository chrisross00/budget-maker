export const defaultprogress = [
  {
    progressId: 1,
    complete: false,
    inProgress: true
  }, {
    progressId: 2,
    complete: false,
    inProgress: false
  }, {
    progressId: 3,
    complete: false,
    inProgress: false
  }
]

export default (state = defaultprogress, action) => {
  switch (action.type) {
    case 'UPDATE_PROGRESS':
      console.log(state, action);
      return state.map((step) => {
        if (step.progressId === action.progressId) {
          return {
            ...step,
            ...action.updates
          }
        }
        else {
          return step
        }
      })
    default:
      return state
  }
}
