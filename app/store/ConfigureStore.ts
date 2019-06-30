import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

import rootReducer, { AppState } from './Index';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['monitorList'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

/** Creating the store for Redux
  * @param {object} initailState is the object that contains the initail states.
  * @returns {object} Return the store object for Redux.
*/
export default function configureStore() {
  const store: AppState = createStore(
    persistedReducer, composeEnhancers(applyMiddleware(thunk)),
  );
  const persistor = persistStore(store);
  return { store, persistor };
  // return createStore(rootReducer, initailState, composeEnhancers(applyMiddleware(thunk)));
}
