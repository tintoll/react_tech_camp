import * as React from "react";
import { Row, Col, Card } from "antd";
import { OrderStatusContiner } from "../containers";
import { PageHeader } from "../components";

export default class Dashboard extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <PageHeader label="대시보드" />
        <OrderStatusContiner />
      </React.Fragment>
    );
  }
}
