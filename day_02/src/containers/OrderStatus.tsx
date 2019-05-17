import * as React from "react";
import { MonitorCard, Counter } from "../components";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../types";
import { fetchFailure, fetchSuccess } from "../actions";

interface OrderStatusProps {
  monitoring: boolean;
  success: number;
  failure: number;
  fetchSuccess(): void;
  fetchFailure(): void;
}

interface OrderStatusState {
  errorRate: string;
}

const mapStateToProps = (state: StoreState) => ({
  ...state
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSuccess: () => {
    dispatch(fetchSuccess());
  },
  fetchFailure: () => {
    dispatch(fetchFailure());
  }
});

class OrderStatus extends React.PureComponent<
  OrderStatusProps,
  OrderStatusState
> {
  timerId: any = null;

  state = {
    errorRate: "0"
  };

  componentDidUpdate(prevProps: any) {
    if (prevProps.monitoring !== this.props.monitoring) {
      if (this.props.monitoring) {
        this.timerId = setInterval(() => {
          this.props.fetchSuccess();
          this.props.fetchFailure();
        }, 200);
      } else {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }

    if (
      prevProps.success !== this.props.success ||
      prevProps.failure !== this.props.failure
    ) {
      this.setState({
        errorRate:
          this.props.failure > 0
            ? Number((this.props.failure / this.props.success) * 100).toFixed(2)
            : "0"
      });
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  render() {
    return (
      <MonitorCard>
        <Counter title="Success" count={this.props.success} />
        <Counter title="Failure" count={this.props.failure} color="red" />
        <Counter title="Error Rate" count={this.state.errorRate} unit="%" />
      </MonitorCard>
    );
  }
}

export const OrderStatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderStatus);
