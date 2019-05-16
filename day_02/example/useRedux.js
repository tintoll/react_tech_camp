// import { createStore } from "redux";
const redux = require('redux');
const createStore = redux.createStore;

const initState = {
  checkIn : false,
  checkOut : false,
  visitorName : '',
  checkInTimestamp : 0,
  checkOutTimestamp: 0,
}

const reducers = (state = initState, action) => {

  switch (action.type) {
    case "checkIn":
      return {
        ...state,
        checkIn : true,
        visitorName: action.visitorName,
        checkInTimestamp : Date.now()
      }
      
    case "checkOut":
      return {
        ...state,
        checkOut: true,
        checkOutTimestamp: Date.now()
      }
    default:
      Object.assign({}, state);
  }
}
const store = createStore(reducers);

store.subscribe( () => {
  const state = store.getState();
  console.log(state);
});

store.dispatch({
  type : "checkIn",
  visitorName : "틴톨"
});

store.dispatch({
  type: "checkOut",
});