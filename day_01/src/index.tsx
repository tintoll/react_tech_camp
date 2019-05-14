import * as React from "react";
import { render } from "react-dom";
import App from "./App";

// 타입을 모르면 any로 사용하면 된다.
//const rootElement: HTMLElement = document.getElementById("root");
//render(<App />, rootElement);

render(<App />, document.getElementById("root"));
