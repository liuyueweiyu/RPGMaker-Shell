import { combineReducers } from 'redux';
import { NewProject } from '../components/Project/project';
import { NewMapFile, OpenMapFile } from '../components/Project/file';
import { ACTION_TYPE_OPEN_FILE, ACTION_TYPE_ADD_FILE } from './actions/file';
import { ACTION_TYPE_ADD_PROJECT, ACTION_TYPE_SET_OPENED_PROJECT } from './actions/projects';
import { ACTION_TYPE_ADD_ACTIVE_NODE, ACTION_TYPE_ADD_HOVER_NODE } from './actions/nodes';
import { engine } from '../components/Render/state/engine';
export const projects = (state = [], action:any) => {
  switch (action.type) {
    case ACTION_TYPE_ADD_PROJECT:
      return [...state,NewProject(action.name)] ;
    case ACTION_TYPE_ADD_FILE:
      return NewMapFile(action.name,action.row,action.column,state ,action.projectId)
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

export const openedMapFile = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPE_OPEN_FILE:
      return OpenMapFile(action.mapFile);
    default:
      return state;
  }
}

export const selectedNodes = (state = {}, action : any) =>{
  switch (action.type) {
    case ACTION_TYPE_ADD_ACTIVE_NODE:
      return engine.node.addActiveNode(state,action.node);
    case ACTION_TYPE_ADD_HOVER_NODE:
      return engine.node.addHoverNode(state,action.node);
    default:
      return state;
  }
}

export const reducer = combineReducers({
  projects : projects,
  openedProject : openedProject,
  openedMapFile : openedMapFile,
  selectedNodes : selectedNodes
})

