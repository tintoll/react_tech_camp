## Redux

- 상태(state)를 관리하는 라이브러리이다.
- 상태를 store라는 곳에 저장한다. store는 여러개 만들 수 있지만 단일 store만 사용하는 것을 권장한다.

```javascript
// store는 그냥 일반 객체이다.
store = {
  load : false
}
```

- Redux는 직접 store를 변경하는 행위를 하지 못하게 하고 있다. 
  - 하나의 상태가 변경되든 여러개의 상태가 변경되든 무조건 새로운 store객체를 만들어야 한다. 
  - 상태가 변경되면 이전 store를 스냅샷을 찍어 놓는다고 생각하면 된다. 
  - 그래서 마지막의 스냅샷이 최신 store인 셈이다. 

#### Redux 사용예제

1. createStore() 함수를 이용하여 store 를 만든다.
2. 첫번째 인자로 reducer 함수를 넣어준다. 
   1. reducer의 첫번째 인자는 현재 state를 넣어줍니다.
   2. 두번째 인자로는 액션 객체를 넣어줍니다. 
   3. action.type에 따라 새로운 state를 만들어서 리턴하여 줍니다.
      1. 새로운 객체를 만들때 Object.assign({}, state)함수나  Spread문법(…state)을 이용합니다.
3. subscribe()함수를 이용하여 store을 구독(subscribe)합니다.
4. dispatch()함수를 이용하여 상태값을 수정 요청합니다. 

```javascript
// useRedux.js
import { createStore, applyMiddleware } from "redux";

// 초기 state
const InitializeState = {
  checkinStatus: false,
  visitorName: "",
  checkinTimestamp: 0,
  checkoutTimestamp: 0
};

// default value설정 
function reducer(state = InitializeState, action) {
  switch (action.type) {
    case "checkin":
      // Spread문법 이용 
      return {
        ...state,
        checkinStatus: true,
        checkinTimestamp: Date.now(),
        visitorName: action.visitorName,
        checkoutTimestamp: 0
      };
    case "checkout":
      return {
        ...state,
        checkinStatus: false,
        checkoutTimestamp: Date.now()
      };
    case "reset":
      return {
        ...state,
        checkinStatus: false,
        visitorName: "",
        checkinTimestamp: 0,
        checkoutTimestamp: 0
      };
    default:
      return Object.assign({}, state);
  }
}

// 첫번째 인자로 reduer 함수를 넣어줍니다. 
const store = createStore(reducer);

// 구독을 시작합니다.
store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

// 상태값 수정 요청
store.dispatch({
  type: "checkin",
  visitorName: "김민태"
});
store.dispatch({
  type: "checkout"
});
```

#### Redux를 어렵게 느끼는 이유 

- 대부분의 사람들은 React에서 사용하는 ``Wrapper 함수(기존 함수를 한번 더 감싸서 원래 동작에 약간의 처리를 추가하는 함수)``가 적용된 react-redux 부터 사용하여 redux 내부를 이해하지 않고 시작하여 어렵게 느껴질수있다. (Redux 문법은 위의 예제가 전부이다)

- store이 설계가 어렵다. 

  - 이 부분은 경험이 많이 필요한 부분이다. 
  - App의 규모가 커치면 상태도 많아지게 되는데 이부분을 어떤 구조로 가져 갈지가 경험하지 않으면 쉽지 않은 부분이다. 
  - 객체의 뎁스가 너무 깊어지면 안된다. redux는 무조건 새로운 객체를 리턴해야하는데 기존 객체를 복사할때 사용하는 ``Object.assin()이나 Spread문법은 2뎁스 정도까지 박에 복사가 되지 않는다. `` 그래서 store설계가 중요하다.

  

## React에서 Redux사용

#### react-redux 설치

- react 환경에 사용하기 위한 react-redux를 추가로 설치해준다.

  ```shell
  $ npm i react-redux
  ```

#### 진입점(index.js) 설정

```javascript
...

import { Provider } from 'react-redux';
import { createStore } from 'redux';

// 1. reducers함수를 인자로 주어서 store를 생성한다.
const store = createStore(reducers);

// 2. Provider컴포넌트를 이용하여 store를 적용할 최상위 컴포넌트를 감싸줍니다.
// 3. Provider store속성으로 생성한 store 넣어줍니다.
ReactDom.render( 
  <Provider store={store}>
  	<App />
  </Provider>
  , document.querySelector('#root'));
```

#### Actions 만들기

```javascript
// 1. 액션 타입을 정의 합니다.
export const FETCH_FAILURE = '@fetch/failure';
export const FETCH_SUCCESS = '@fetch/success';

// 2. 액션 객체를 만들어주는 액션생성자(Action Creator) 함수를 만듭니다.
export const fetchFailure = () => ({
  type : FETCH_FAILURE,
  payload : null
});
export const fetchSuccess = () => ({
  type : FETCH_SUCCESS,
  payload : null
});
```

#### Reducers 함수 만들기 

````javascript
// 1. 초기 state 구성
const initState = {
  success : 0,
  failure : 0
}
// 2. 액션 타입에 따라서 state 객체를 리턴하는 reducers함수 작성
export const reducers = (state = initState, action) {
  switch(action.type) {
    case FETCH_FAILURE :
      return {
        ...state,
        failure: state.failure + Math.floor(Math.random() * 2 - 0)
      }
    case FETCH_SUCCESS :  
      return {
        ...state,
        success: state.success + Math.floor(Math.random() * (100 - 1)),
      }
    default : 
      return Object.assign({},state);
  }
}
````

#### store를 사용할 컴포넌트 설정

````javascript
...
import {connect} from 'react-redux';
import { fetchSuccess, fetchFailure} from './actions';
class MonitorApp extends Component {
  
  ...
  // 4. 내부에서 해당 값을 props를 통해서 사용하면 된다. 
  this.props.fetchSuccess();
	this.props.fetchFailure();

  ...
  
  <Monitor success={this.props.success} success={this.props.failure} />
 
}

// 1. mapStateToProps함수를 만든다 
//  -> store 에 있는 사용할 상태를 컴포넌트 props로 넣어준다.
const mapStateToProps = (state) => ({
  ...state // 전체를 다 줄때
});
// 2. mapDispatchToProps함수를 만든다.
//  -> 액션에 해당하는 메소드를 컴포넌트 props로 넣어준다.
const mapDispatchToProps = (dispatch) => ({
  fetchSuccess : () => dispatch(fetchSuccess()),
  fetchFailure : () => dispatch(fetchFailure())
})

// 3. connect함수의 인자로 mapStateToProps,mapDispatchToProps 넣어주고 적용할 컴포넌트를 지정해준다.
export default connect(
	mapStateToProps,
  mapDispatchToProps
)(MonitorApp);
````



## 컴포넌트 분리





