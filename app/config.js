export const BASE_URL = ''; // Production server
/* URLS */
export const HOME_PAGE_URL = '/';
export const TEST_PAGE_URL = '/test';
export const SIGNIN_PAGE_URL = '/signin';
export const DEFAULT_LANGUAGE = 'en';

export const cognitoConfig = {
  userPoolId: 'us-west-2_H5b19kIOP',
  region: 'us-west-2',
  userPoolWebClientId: '2nr52a5iheoumqcgr47qnlqojq',
  identityPoolId: 'us-west-2:dc3b0c22-b71b-4196-a0e5-91896228a809',
};

export const amplifyAuthSignOption = {
  signUpConfig: {
    hiddenDefaults: ['phone_number', 'email', 'username'],
    signUpFields: [
      {
        label: 'Nickname', key: 'nickname', required: true, type: 'string', displayOrder: 1,
      },
      {
        label: 'Email', key: 'username', required: true, type: 'string', displayOrder: 2,
      },
    ],
  },
  federated: {
    google_client_id: '953200455973-a81rnojmm1ogtudaqtgsd1ge4bris6gt.apps.googleusercontent.com',
    facebook_app_id: '405214103389849',
  },
};
