import { combineReducers } from 'redux';

import filters from './filters';
import { ReduxState } from '../../types';

export default combineReducers<ReduxState>({
  filters,
});
