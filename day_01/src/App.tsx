import * as React from 'react';
import { MonitorCard, PlayButton } from "./components";
import { Typography } from "antd";

import "antd/dist/antd.css";
import "./sass/main.scss";

interface Application {
  timerId: number;
  state : {
    success: number;
    failure: number;
  };
  onStart(): void;
  onStop(): void;
}

export default class App extends React.Component implements Application {
  timerId = 0;
  state = {
    success: 0,
    failure : 0
  }

  onStart = () => {
    this.timerId = setInterval(() => {
      // this.setState({
      //   success: this.state.success + Math.floor(Math.random() * (100 - 1)),
      //   failure: this.state.failure + Math.floor(Math.random() * 2 - 0)
      // });
      this.setState((prevState: any) => {
        return {
          success: prevState.success + Math.floor(Math.random() * (100 - 1)),
          failure: prevState.failure + Math.floor(Math.random() * 2 - 0)
        }
      });
    }, 200);
  }
  onStop = () => {
    clearTimeout(this.timerId);
    this.timerId = 0;
  }
  render() {
    return (
      <div>
        <header>
          <Typography.Title>React & TS Bolierplate</Typography.Title>
          <Typography>Order Monitor</Typography>
        </header>
        <main>
          <MonitorCard 
              success={this.state.success}
              failure={this.state.failure}
            />
          <PlayButton 
              monitoring={false}
              onPlay={this.onStart}
              onPause={this.onStop}
            />  
        </main>
      </div>
    );
  }
}
