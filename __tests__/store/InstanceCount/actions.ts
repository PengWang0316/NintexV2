import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { GET_INSTANCE_COUNT_API } from '../../../app/store/Urls';
import { FETCH_INSTANCE_COUNT_SUCCESS } from '../../../app/store/InstanceCount/types';
import { fetchInstanceCount } from '../../../app/store/InstanceCount/actions';

jest.mock('../../../app/libs/GetJWTToken', () => jest.fn().mockReturnValue('JWT'));

const mockAxios = new MockAdapter(axios);
const mockStore = configureStore([thunk]);

describe('InstanceCount Actions', () => {
  test('fetchInstanceCount', async () => {
    const returnValue = { count: 1 };
    const expectedActions = [
      {
        type: FETCH_INSTANCE_COUNT_SUCCESS,
        instanceCount: returnValue.count,
      },
    ];

    mockAxios.onGet(GET_INSTANCE_COUNT_API, { headers: { Authorization: 'JWT', 'Content-Type': 'application/json' } }).reply(200, returnValue);
    const store = mockStore();
    await store.dispatch(fetchInstanceCount());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
