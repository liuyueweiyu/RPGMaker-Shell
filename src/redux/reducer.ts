import { combineReducers } from 'redux';
import { ACTION_TYPE_ADD_PROJECT } from './anction';
import { NewProject } from '../components/Project/project';

export const projects = (state = [], action:any) => {
  switch (action.type) {
    case ACTION_TYPE_ADD_PROJECT:
      return [...state,NewProject(action.name)] ;
    default: 
      return state;
  }
};


export const reducer = combineReducers({
  projects : projects
})

