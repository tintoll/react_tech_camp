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



## Redux-Saga 연동

- 공식 번역 페이지 : https://mskims.github.io/redux-saga-in-korean/



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