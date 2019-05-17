import * as React from 'react';
import { MonitorCard, PlayButton } from "./components";
import { Typography } from "antd";

import { Dispatch } from "redux";
import { connect }  from 'react-redux';
import { StoreState } from './types';
import { fetchFailure, fetchSuccess}  from './actions';

import "antd/dist/antd.css";
import "./sass/main.scss";

interface Application {
  timerId: number;
  onStart(): void;
  onStop(): void;
}

interface AppProps {
  success: number;
  failure: number;
  fetchSuccess() : void;
  fetchFailure() : void;
}

class MonitorApp extends React.Component<AppProps> implements Application {
  timerId = 0;
  
  onStart = () => {
    this.timerId = setInterval(() => {
      // this.setState((prevState: any) => {
      //   return {
      //     success: prevState.success + Math.floor(Math.random() * (100 - 1)),
      //     failure: prevState.failure + Math.floor(Math.random() * 2 - 0)
      //   }
      // });
      this.props.fetchSuccess();
      this.props.fetchFailure();
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
              success={this.props.success}
              failure={this.props.failure}
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

const mapStateToProps = (state: StoreState) => ({
  ...state
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchFailure: () => { dispatch(fetchSuccess())},
  fetchSuccess: () => { dispatch(fetchFailure())},
})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitorApp);


export default App;