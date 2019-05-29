import * as React from "react";
import { Row, Col, Card } from "antd";
import { OrderStatusContiner } from "../containers";
import { PageHeader } from "../components";

export default class Order extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageHeader label="주문" />
      </React.Fragment>
    );
  }
}
