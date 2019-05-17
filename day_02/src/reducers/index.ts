import { StoreState } from "../types";
import * as Actions from "../actions";
import { getType, ActionType } from "typesafe-actions";

const initState: StoreState = {
  monitoring: false,
  success: 0,
  failure: 0
};
const mainReducers = (
  state: StoreState = initState,
  action: ActionType<typeof Actions>
) => {
  switch (action.type) {
    case getType(Actions.fetchSuccess):
      return {
        ...state,
        success: state.success + Math.floor(Math.random() * (100 - 1))
      };
    case getType(Actions.fetchFailure):
      return {
        ...state,
        failure: state.failure + Math.floor(Math.random() * 2 - 0)
      };
    case getType(Actions.startMonitoring):
      return {
        ...state,
        monitoring: true
      };
    case getType(Actions.stopMonitoring):
      return {
        ...state,
        monitoring: false
      };
    default:
      return Object.assign({}, state);
  }
};

export default mainReducers;
