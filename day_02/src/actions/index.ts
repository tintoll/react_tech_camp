import { FETCH_FAILURE, FETCH_SUCCESS } from './action-type';

export interface CommonAction {
  type : typeof FETCH_SUCCESS | typeof FETCH_FAILURE,
  payload : null
}

// const fetchSuccess = (): CommonAction => {
//   return {
//     type: FETCH_SUCCESS,
//     payload : null
//   }
// }
// 아래와 같이 줄여쓸수있다. 
export const fetchSuccess = (): CommonAction => ({
    type: FETCH_SUCCESS,
    payload: null
});

export const fetchFailure = (): CommonAction => ({
  type : FETCH_FAILURE,
  payload : null
})
