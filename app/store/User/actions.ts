import { Auth } from 'aws-amplify';

import {
  USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, UserActionType, UserType, CognitoUserType,
} from './types';

const loginSuccess = (cognitoUser: CognitoUserType): UserActionType => ({
  type: USER_LOGIN_SUCCESS,
  cognitoUser,
});

const logoutSuccess = (): UserActionType => ({
  type: USER_LOGOUT_SUCCESS,
});

/**
 * Get the current login user informaiton and dispatch it to the Redux state
 * @return {function} Return a function with dispatch.
 */
export const currentAuthenticatedUser = () => dispatch => Auth.currentAuthenticatedUser()
  .then(user => dispatch(loginSuccess(user)))
  .catch(err => console.log(err));

/**
 * Perform a logout action via aws-amplify Auth function and clear the Redux state
 * @return {function} Return a function with dispatch.
 */
export const logout = () => dispatch => Auth.signOut()
  .then(() => dispatch(logoutSuccess()))
  .catch(err => console.log(err));
