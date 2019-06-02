import * as React from "react";
import { Row, Col, Card } from "antd";
import { OrderStatusContiner, AuthContainer } from "../containers";
import { PageHeader } from "../components";

export default class Dashboard extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <AuthContainer>
          <PageHeader label="대시보드" />
        </AuthContainer>
        <OrderStatusContiner />
      </React.Fragment>
    );
  }
}
