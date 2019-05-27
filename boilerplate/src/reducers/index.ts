import { StoreState, ITimelineItem } from "../types";
import * as Actions from "../actions";
import { getType, ActionType } from "typesafe-actions";

const initState: StoreState = {
  monitoring: false,
  monitoringDuration: 200,
  success: 0,
  failure: 0,
  notifications : [],
  successTimeline: [],
  failureTimeline: [],
  showTimeline: false,
};
const mainReducers = (
  state: StoreState = initState,
  action: ActionType<typeof Actions>
) => {
  switch (action.type) {
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
    case getType(Actions.updateOrderStatus):
      // 두개가 같음.
      /*
      ...action.payload
       ->  
      success : action.payload.success
      failure: action.payload.failure
      */
      return {
        ...state,
        ...action.payload
      };
    case getType(Actions.addNotification) :
      return {
        ...state,
        notifications : [
          ...state.notifications,
          {id : Date.now(), ...action.payload}
        ]  
      }
    case getType(Actions.showOrderTimelineChart):
      return {
        ...state,
        showTimeline: true
      };
    case getType(Actions.hideOrderTimelineChart):
      return {
        ...state,
        showTimeline: false
      }; 
    case getType(Actions.updateOrderTimeline):
      const { success, failure } = action.payload;
      return {
        ...state,
        successTimeline: success.map(([time, count]) => ({ time, count })),
        failureTimeline: failure.map(([time, count]) => ({ time, count }))
      };  
    default:
      return Object.assign({}, state);
  }
};

export default mainReducers;
