import axios from 'axios';

import {
  FETCH_TOP_PUBLISHERS_COUNT_SUCCESS, TopPublisherCountActionType, PublisherCountType,
} from './types';
import { GET_TOP_PUBLISHERS_COUNT_API } from '../Urls';
import getJwtToken from '../../libs/GetJWTToken';

const fetchTopPublishersCountSuccess = (
  topPublishersCount: PublisherCountType[],
): TopPublisherCountActionType => ({
  type: FETCH_TOP_PUBLISHERS_COUNT_SUCCESS,
  topPublishersCount,
});

export const fetchTopPublishersCount = () => async (dispatch) => {
  const { data } = await axios.get(GET_TOP_PUBLISHERS_COUNT_API, { headers: { Authorization: await getJwtToken(), 'Content-Type': 'application/json' } });
  dispatch(fetchTopPublishersCountSuccess(data));
};
export default fetchTopPublishersCount;
