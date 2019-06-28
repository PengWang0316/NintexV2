export const FETCH_OFFICEKEY_SUCCESS = 'fetchOfficekeySuccess';
export const ADD_OFFICEKEY_SUCCESS = 'addOfficekeySuccess';
export const DELETE_OFFICEKEY_SUCCESS = 'deleteOfficekeySuccess';

export interface OfficeKeyData {
  [tenant: string]: [number, string, string];
}

export interface OfficeKeysType {
  isFetch: boolean;
  data: OfficeKeyData;
}

export interface RawOfficeApiKey {
  id: number;
  endpoint: string;
  apiKey: string;
  cookie: string;
}

export interface OfficeKeyActionType {
  type: string;
  keys: RawOfficeApiKey[];
  endpoint: string;
  key: string;
  cookie: string;
  id: number;
}
