// core react
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider }  from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// saga
import createSagaMiddleware from 'redux-saga';
import {sagaInit} from "./saga.js";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(sagaInit);

// reducers
import rootReducer from './reducers/root-reducer'

// components
import PageContainer from './components/page-container';

import './styles/page.scss';

ReactDOM.render(
  <Provider store={store}>
    <PageContainer />
  </Provider>, document.getElementById('app')
);
