import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppContainer from './containers/AppContainer';

import reducer from './reducers';

import './index.css';

const middleware = [ thunk ],
  defaultState = {};

const store = createStore(reducer,
    defaultState,
    applyMiddleware(...middleware));

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </MuiThemeProvider>, document.getElementById('app-root')
);
