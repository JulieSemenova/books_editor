import { combineReducers } from 'redux';

import filters from './filters';
import books from './books';

import { ReduxState } from '../../types';

export default combineReducers<ReduxState>({
  filters,
  books,
});
