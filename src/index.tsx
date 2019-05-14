import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from '../src/pages/MainPage/MainPage';

const mountPoint = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainPage} />
    </Switch>
  </BrowserRouter>,
  mountPoint,
);
