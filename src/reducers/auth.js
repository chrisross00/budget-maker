export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('hit login reducer');
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}
