export const reducer = (state = [], action:any) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state,newProject(action.name)] ;
    default: 
      return state;
  }
  return state;
};


function newProject(name : string) {
    return {
      id : +new Date(),
      name:name
    }
}
