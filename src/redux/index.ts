// import { applyMiddleware, createStore } from 'redux';
import { createStore } from 'redux';
import { reducer } from './reducer';
// import {createLogger} from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

// @ts-ignore
const store = createStore(reducer,composeWithDevTools());

export default store