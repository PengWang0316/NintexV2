import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../actions/ActionTypes';

const user = (state = null, { type, cognitoUser }) => {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return {
        nickname: cognitoUser.attributes
          ? cognitoUser.attributes.nickname
          : cognitoUser.name,
      };
    case USER_LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};
export default user;
