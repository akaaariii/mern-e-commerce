import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import './bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import reducers from './reducers';


const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger];

const store = createStore(reducers, {}, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
