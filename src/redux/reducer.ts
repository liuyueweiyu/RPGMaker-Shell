import { combineReducers } from 'redux';
import { 
  ACTION_TYPE_ADD_PROJECT,
  ACTION_TYPE_ADD_FILE,
  ACTION_TYPE_SET_OPENED_PROJECT,
  ACTION_TYPE_SET_OPENED_FILE
} from './anction';
import { NewProject } from '../components/Project/project';
import { NewMapFile } from '../components/Project/file';
export const projects = (state = [], action:any) => {
  switch (action.type) {
    case ACTION_TYPE_ADD_PROJECT:
      return [...state,NewProject(action.name)] ;
    case ACTION_TYPE_ADD_FILE:
      return NewMapFile(action.name,action.column,action.row,state ,action.projectId)
    default: 
      return state;
  }
};

export const openedProject = (state = 0, action: any) => {
  switch(action.type) {
    case ACTION_TYPE_SET_OPENED_PROJECT:
      return action.id;
    default :
      return state;
  }
}

export const openedMapFile = (state = 0, action: any) => {
  switch (action.type) {
    case ACTION_TYPE_SET_OPENED_FILE:
      return action.id;
    default:
      return state;
  }
}

export const reducer = combineReducers({
  projects : projects,
  openedProject : openedProject,
  openedMapFile : openedMapFile
})

