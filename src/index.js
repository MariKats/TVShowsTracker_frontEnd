import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import WatchList from './containers/watch_list';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
      <Route exact path='/shows' component={WatchList}></Route>
      <Route exact path='/' component={App}></Route>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.root'));
