import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import CatalogPage from '../src/pages/CatalogPage/CatalogPage';
import BookPage from '../src/pages/BookPage/BookPage';

import store from './redux/store';
import './styles/index.css';

const mountPoint = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CatalogPage} />
        <Route path="/:id" component={BookPage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  mountPoint,
);
