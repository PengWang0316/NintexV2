import axios from 'axios';

import { FETCH_PUBLISHER_COUNT_SUCCESS, PublisherCountActionType } from './types';
import { GET_PUBLISHER_COUNT_API } from '../Urls';
import getJwtToken from '../../libs/GetJWTToken';

const fetchPublisherCountSuccess = (publisherCount: number): PublisherCountActionType => ({
  type: FETCH_PUBLISHER_COUNT_SUCCESS,
  publisherCount,
});

export const fetchPublisherCount = () => async (dispatch) => {
  const { data: { count } } = await axios.get(GET_PUBLISHER_COUNT_API, { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchPublisherCountSuccess(count));
};
export default fetchPublisherCount;
