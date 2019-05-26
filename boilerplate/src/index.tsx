import * as React from "react";
import { render } from "react-dom";
import App from "./App";

import { composeWithDevTools } from "redux-devtools-extension";

// redux 관련 추가 
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from './reducers';

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

// saga 미들웨어 함수 생성
const sagaMiddleware = createSagaMiddleware();
// store를 만들때 applyMiddleware함수를 이용해서 여러 미들웨어들을 넣어줄 수 있다. 
const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// saga를 실행 해준다. runner라고 함.
// Generator.next() 해주는 거랑 같다고 보면 된다. 
sagaMiddleware.run(rootSaga);

// 타입을 모르면 any로 사용하면 된다.
//const rootElement: HTMLElement = document.getElementById("root");
//render(<App />, rootElement);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById("root"));
