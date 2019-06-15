export const BASE_URL = ''; // Production server
/* URLS */
export const HOME_PAGE_URL = '/';
export const WORKFLOW_MANAGER_PAGE_URL = '/workflowTable';
export const SIGNIN_PAGE_URL = '/signin';
export const DEFAULT_LANGUAGE = 'en';

export const cognitoConfig = {
  userPoolId: 'us-west-2_tRKmWgVg7',
  region: 'us-west-2',
  userPoolWebClientId: '129akg14i97lk19h9k7ft84sne',
  // identityPoolId: 'us-west-2:8fdd942c-2662-4046-8375-edd97c70e7ef',
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
  // federated: {
  //   google_client_id: '459983539066-jrve8fkm4hhcmjcq6van4rb6omp0ifti.apps.googleusercontent.com',
  //   facebook_app_id: '366726577283374',
  // },
};

export const BEARER_HEADER = 'Bearer';
export const NWC_LIST_WORKFLOWS_API = 'https://us.nintex.io/workflows/v1/designs';
export const NWC_PLATFORM = 'nwc';
