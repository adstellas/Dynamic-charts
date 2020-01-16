import React from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import App from './components/App'
import chartModels from './reducers/reducers'
import api from './Api'
import './assets/index.css';

const store = createStore(chartModels, applyMiddleware(thunk.withExtraArgument(api)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
