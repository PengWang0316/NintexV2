import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { fetchActionNameCount } from '../../../app/store/ActionNameCount/actions';
import { GET_ACTION_NAME_COUNT_API } from '../../../app/store/Urls';
import { FETCH_ACTION_NAME_COUNT_SUCCESS } from '../../../app/store/ActionNameCount/types';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../app/libs/GetJWTToken', () => jest.fn().mockReturnValue('JWT'));

describe('ActionNameCount Actions', () => {
  test('fetchActionNameCount', async () => {
    const nameCount = [
      { text: 'actionA', value: 1 },
      { text: 'actionB', value: 2 },
    ];
    const expectedActions = [
      {
        type: FETCH_ACTION_NAME_COUNT_SUCCESS,
        actionNameCount: nameCount,
      },
    ];

    axiosMock.onGet(GET_ACTION_NAME_COUNT_API, { headers: { Authorization: 'JWT', 'Content-Type': 'application/json' } }).reply(200, nameCount);
    const store = mockStore();
    await store.dispatch(fetchActionNameCount());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
