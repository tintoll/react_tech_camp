import * as React from "react";
import { MonitorCard, Counter } from "../components";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../types";
import { fetchFailure, fetchSuccess } from "../actions";

interface OrderStatusProps {
  success: number;
  failure: number;
}

interface OrderStatusState {
  errorRate: string;
}

const mapStateToProps = (state: StoreState) => ({
  ...state
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
  mapStateToProps
)(OrderStatus);
