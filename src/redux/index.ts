// import { applyMiddleware, createStore } from 'redux';
import { createStore } from 'redux';
import { reducer } from './reducer';
// import {createLogger} from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LOCALSTORAFE_ITEM_MAP } from '../components/Render/constant/project';
// @ts-ignore
const store = createStore(reducer,JSON.parse(localStorage.getItem(LOCALSTORAFE_ITEM_MAP)),composeWithDevTools());
export default store