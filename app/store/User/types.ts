export const USER_LOGIN_SUCCESS = 'userLoginSuccess';
export const USER_LOGOUT_SUCCESS = 'userLogoutSuccess';

export interface UserType {
  nickname: string;
}

export interface CognitoUserType {
  attributes?: { nickname: string; [propName: string]: any };
  name?: string;
  [propName: string]: any;
}

export interface UserActionType {
  type: string;
  cognitoUser?: CognitoUserType;
}
