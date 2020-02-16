
const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            return state + action.count;
            default: 
            return state;
        }
    };
    
const store = require('redux').createStore(reducer);
store.subscribe(()=>{
    console.log("store.subscribe:",store.getState())
  })
  store.dispatch({
    type : 'ADD_PROJECT',
    count : 1
  })