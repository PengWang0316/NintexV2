export const UPDATE_NWC_LAST_DATE_SUCCESS = 'updateNwcLastDateSuccess';

export interface LastNwcType {
  [tenant: string]: string;
}

export interface UpdateLastDateType {
  type: typeof UPDATE_NWC_LAST_DATE_SUCCESS;
  tenant: string;
  lastDate: string;
}
