// import { applyMiddleware, createStore } from 'redux';
import { createStore } from 'redux';
import { reducer } from './reducer';
// import {createLogger} from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { LOCALSTORAFE_ITEM_MAP } from '../components/Render/constant/project';
import { JsonToState } from '../components/Render/state/data/map/util';

const initState = JsonToState(localStorage.getItem(LOCALSTORAFE_ITEM_MAP) as string);
// @ts-ignore
const store = createStore(reducer,initState,composeWithDevTools());
export default store