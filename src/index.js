import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import {reducers} from './reducers';
import './index.css';

import { composeWithDevTools } from 'redux-devtools-extension';

// ComposewithDevTools is an extension that allows devs to see the states in Redux store. 
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));




ReactDOM.render(
    <Provider store = {store}>
        <App/>
    </Provider>, 
    document.getElementById('root'),
);