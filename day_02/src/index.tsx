import * as React from "react";
import { render } from "react-dom";
import App from "./App";

// redux 관련 추가 
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from './reducers';
const store = createStore(reducers);


// 타입을 모르면 any로 사용하면 된다.
//const rootElement: HTMLElement = document.getElementById("root");
//render(<App />, rootElement);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById("root"));
