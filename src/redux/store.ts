import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import rootReducer from './reducers/index';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000),
);
export default store;
