// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// @ts-nocheck
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Auth } from 'aws-amplify';

import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../../app/actions/ActionTypes';
import * as UserActions from '../../app/actions/UserActions';

jest.mock('aws-amplify', () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn().mockReturnValue(Promise.resolve({ id: 'userid' })),
    signOut: jest.fn().mockReturnValue(Promise.resolve()),
  },
}));

// const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
console.log = jest.fn();

describe('UserActions', () => {
  beforeEach(() => {
    console.log.mockClear();
  });

  test('currentAuthenticatedUser with a user', () => {
    const cognitoUser = { id: 'userid' };
    const expectActions = [
      {
        type: USER_LOGIN_SUCCESS,
        cognitoUser,
      },
    ];
    const store = mockStore();
    store.dispatch(UserActions.currentAuthenticatedUser()).then(() => {
      expect(store.getActions()).toEqual(expectActions);
    });
  });

  test('currentAuthenticatedUser with an error', () => {
    const error = new Error('error');
    Auth.currentAuthenticatedUser.mockReturnValueOnce(Promise.reject(error));
    const store = mockStore();
    store.dispatch(UserActions.currentAuthenticatedUser()).then(() => {
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenLastCalledWith(error);
    });
  });

  test('logout success', () => {
    const expectActions = [
      {
        type: USER_LOGOUT_SUCCESS,
      },
    ];
    const store = mockStore();
    store.dispatch(UserActions.logout()).then(() => {
      expect(store.getActions()).toEqual(expectActions);
    });
  });

  test('logout with an error', () => {
    const error = new Error('error');
    Auth.signOut.mockReturnValueOnce(Promise.reject(error));
    const store = mockStore();
    store.dispatch(UserActions.logout()).then(() => {
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenLastCalledWith(error);
    });
  });
});
