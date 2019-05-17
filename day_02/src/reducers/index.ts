import { StoreState } from '../types';
import {FETCH_FAILURE, FETCH_SUCCESS} from '../actions/action-type';
import * as Actions from '../actions';


const initState: StoreState = {
  success : 0,
  failure : 0,
}
const mainReducers = (state: StoreState = initState, action: Actions.CommonAction) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        success: state.success + Math.floor(Math.random() * (100 - 1)),
        
      }  
    case FETCH_FAILURE:
      return {
        ...state,
        failure: state.failure + Math.floor(Math.random() * 2 - 0)
      }  
    default:
      return Object.assign({}, state);
  }

}

export default mainReducers;
