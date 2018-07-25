import { login, logout } from '../../actions/auth';

test('should create login action object', () => {
  const action = login('abc123');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: 'abc123'
  });

});

test('should create logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
