export const FETCH_NWCKEY_SUCCESS = 'fetchNwckeySuccess';
export const ADD_NWCKEY_SUCCESS = 'addNwckeySuccess';
export const DELETE_NWCKEY_SUCCESS = 'deleteNwckeySuccess';

export interface NWCKeyData {
  [tenant: string]: [number, string];
}

export interface NWCKeysType {
  isFetch: boolean;
  data: NWCKeyData;
}

export interface RawNWCApiKey {
  id: number;
  tenant: string;
  apiKey: string;
}

export interface NWCKeyActionType {
  type: string;
  keys: RawNWCApiKey[];
  tenant: string;
  key: string;
  id: number;
}
