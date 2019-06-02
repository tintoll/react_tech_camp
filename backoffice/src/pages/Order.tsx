import * as React from "react";
import { Row, Col, Card } from "antd";
import { OrderListContailner, AuthContainer } from "../containers";
import { PageHeader } from "../components";

export default class Order extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <AuthContainer>
          <PageHeader label="주문" />
        </AuthContainer>
        <OrderListContailner />
      </React.Fragment>
    );
  }
}
