import * as React from "react";
import { MonitorControllerContainer, OrderStatusContainer } from "./containers";
import { Typography } from "antd";

import "antd/dist/antd.css";
import "./sass/main.scss";

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <header>
          <Typography.Title>React & TS Bolierplate</Typography.Title>
          <Typography>Order Monitor</Typography>
        </header>
        <main>
          <OrderStatusContainer />
          <MonitorControllerContainer />
        </main>
      </div>
    );
  }
}
