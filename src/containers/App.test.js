import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducer from '../reducers';
import AppContainer from './AppContainer';

it('renders without crashing', () => {

  const middleware = [ thunk ],
    defaultState = {};

  const store = createStore(reducer,
      defaultState,
      applyMiddleware(...middleware));

  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
  		<Provider store={store}>
        <AppContainer />
      </Provider>
  	</MuiThemeProvider>, div);

});
