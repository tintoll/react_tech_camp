import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IStoreState } from "../store";
import { Row, Col, Layout, Menu, Icon, Drawer } from "antd";
import { NavLinkProps } from "react-router-dom";
import { closeNotificationCenter } from "../actions";
import { Sidebar } from "../components";
const { Content } = Layout;

import styled from "styled-components";
const FlexItem = styled(Row)`
  padding-top: 5;
  padding-bottom: 10;
`;

interface IProps {
  location?: any;
  children?: React.ReactNode;
  openNotificationCenter: boolean;
  closeNotificationCenter(): void;
}

const mapStateToProps = (state: IStoreState) => {
  return {
    openNotificationCenter: state.openNotificationCenter
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeNotificationCenter: () => dispatch(closeNotificationCenter())
});

class LayoutContainer extends React.PureComponent<IProps, NavLinkProps> {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Drawer
          title="알림"
          placement="right"
          closable={true}
          visible={this.props.openNotificationCenter}
          onClose={() => this.props.closeNotificationCenter()}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>

        <Sidebar location={this.props.location} />

        <Layout>
          <Content style={{ backgroundColor: "#fff" }}>
            <FlexItem type="flex" align="middle">
              <Col style={{ flex: 1 }}>{this.props.children}</Col>
            </FlexItem>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export const DefaultLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutContainer);
