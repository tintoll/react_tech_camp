import * as React from "react";
import { MonitorCard, Counter, Maybe, TinyChart } from "../components";
import { connect } from "react-redux";
import { StoreState, ITimelineItem } from "../types";

interface OrderStatusProps {
  success: number;
  failure: number;
  showTimeline : boolean;
  successTimeline : ITimelineItem[];
  failureTimeline : ITimelineItem[];
}


const mapStateToProps = (state: StoreState) => {
  return {
    showTimeline : state.showTimeline,
    success : state.success,
    failure : state.failure,
    successTimeline : state.successTimeline,
    failureTimeline : state.failureTimeline
  }
};

class OrderStatus extends React.PureComponent<OrderStatusProps> {
  state = {
    errorRate: 0
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

  render() {
    return (
      <MonitorCard>
        <Counter title="Success" count={this.props.success}>
          <Maybe test={this.props.showTimeline}>
            <TinyChart 
              source={this.props.successTimeline.slice(
                this.props.successTimeline.length - 10
              )}
            />
          </Maybe>  
        </Counter>
        <Counter title="Failure" count={this.props.failure} color="red">
          <Maybe test={this.props.showTimeline}>
            <TinyChart
              source={this.props.failureTimeline.slice(
                this.props.failureTimeline.length - 10
              )}
            />
          </Maybe>
        </Counter>  
        <Counter title="Error Rate" count={this.state.errorRate} unit="%" />
      </MonitorCard>
    );
  }
}

export const OrderStatusContainer = connect(mapStateToProps)(OrderStatus);
