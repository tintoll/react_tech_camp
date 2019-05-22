## 리덕스 미들웨어 구조

미들웨어 등록해 놓으면 리덕스 구조에서 중간에 어떤 행위를 실행하고 그 다음을 실행흐름으로 넘어가진다. 

```javascript
const middleware = function(store) {
 return function(next) {
  return function(action) {
   if(action.type === 'fetchUserList') {
     return new Promise((resolve) => resolve(100));
   }
  }
 }
}
// 축약 문법
const middleware = store => next => action => {
 if(action.type === 'fetchUserList') {
    return new Promise((resolve) => resolve(100));
 }
}

```



## Redux-Saga 

- 공식 번역 페이지 : https://mskims.github.io/redux-saga-in-korean/

### redux-saga란

`redux-saga` 는 리액트/리덕스 애플리케이션의 사이드 이펙트, 예를 들면 데이터 fetching이나 브라우저 캐시에 접근하는 순수하지 않은 비동기 동작들을, 더 쉽고 좋게 만드는 것을 목적으로하는 라이브러리입니다.

saga는 애플리케이션에서 사이드 이펙트만을 담당하는 별도의 쓰레드와 같은 것으로 보면 됩니다. `redux-saga`는 리덕스 미들웨어입니다. 따라서 앞서 말한 쓰레드가 메인 애플리케이션에서 일반적인 리덕스 액션을 통해 실행되고, 멈추고, 취소될 수 있게 합니다. 또한 모든 리덕스 애플리케이션의 상태에 접근할 수 있고 리덕스 액션 또한 dispatch 할 수 있습니다.

### 간단예제

```javascript
// Component
class UserComponent extends React.Component {
  ...
  onSomeButtonClicked() {
    const { userId, dispatch } = this.props
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
  }
  ...
}
  
// sagas.js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// worker Saga: USER_FETCH_REQUESTED 액션에 대해 호출될 것입니다
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}
/*
  각각의 dispatch 된 `USER_FETCH_REQUESTED` 액션에 대해 fetchUser를 실행합니다.
  동시에 user를 fetch하는 것을 허용합니다.
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  또는 takeLatest를 사용할 수 있습니다.
  동시에 user를 fetch하는 것을 허용하지 않습니다. 만약 fetch가 이미 대기 상태일 때  "USER_FETCH_REQUESTED"가 dispatch가 되었다면 대기 상태의 fetch는 취소되고 항상 최근 것만이 실행됩니다.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default mySaga;  


// main.js
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// saga 미들웨어를 생성합니다.
const sagaMiddleware = createSagaMiddleware()
// 스토어에 mount 합니다.
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
// 그리고 saga를 실행합니다.
sagaMiddleware.run(mySaga)
```



### Effects 정리

- takeEvery : 동시에 요청온것에 대한 fetch하는 것을 허용합니다
- takeLatest : 동시에 요청온것에 대한 fetch하는 것을 허용하지 않습니다.

- put :  액션을 dispatch 하는것 -> reduces에 보내는 역할
- call : 비동기 요청을 보내고 받는 역할을 한다.
- talke : 액션명에 대한  액션이 오면 실행해주는 역할
- delay : 해당 값 만큼 시간 지연 시켜준다. 
- all : generator 함수는 yield에서 멈추는데 all을 사용하면 한번에 다 실행하라는 의미이다. 
- fork : 태스크를 백그라운드에서 동적으로 실행시킬 수 있게 해준다.





### 04 버전 saga 적용  

1. redux-saga 설치 

   ```shell
   $ npm i redux-saga
   ```

2. saga 미들웨어를 store에 연동 

   ```typescript
   // index.tsx
   
   import createSagaMiddleware from "redux-saga";
   import rootSaga from "./sagas";
   
   // saga 미들웨어 함수 생성
   const sagaMiddleware = createSagaMiddleware(); 
   // store를 만들때 applyMiddleware함수를 이용해서 여러 미들웨어들을 넣어줄 수 있다. 
   const store: StoreState = createStore(reducer, applyMiddleware(sagaMiddleware));
   
   // saga를 실행 해준다. runner라고 함.
   // Generator.next() 해주는 거랑 같다고 보면 된다. 
   sagaMiddleware.run(rootSaga);
   
   ```

3. rootSaga 함수 생성(Generator 함수여야함)

   ```typescript
   // /sagas/index.ts
   import { fork, all, take, race, delay, put } from "redux-saga/effects";
   import { getType } from "typesafe-actions";
   import * as Actions from "../actions";
   
   function* monitoringWorkflow() {
     while (true) {
       yield take(getType(Actions.startMonitoring));
   
       let polling = true;
   
       while (polling) {
         yield all([
           put({ type: getType(Actions.fetchSuccess) }),
           put({ type: getType(Actions.fetchFailure) })
         ]);
   
         const { stoped } = yield race({
           waitting: delay(200),
           stoped: take(getType(Actions.stopMonitoring))
         });
   
         if (stoped) {
           polling = false;
         }
       }
     }
   }
   
   export default function*() {
     yield fork(monitoringWorkflow);
   }
   
   ```

4. rootSaga함수에서 monitoring 해주는 부분을 구현했기때문에 이전에 구현했던 부분 삭제 