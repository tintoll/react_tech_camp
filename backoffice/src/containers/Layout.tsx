import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IStoreState } from "../store";
import { Row, Col, Layout, Menu, Icon, Drawer } from "antd";
import { Link, NavLinkProps } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

interface IProps {
  location?: any;
  children?: React.ReactNode;
}

const mapStateToProps = (state: IStoreState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({});

class LayoutContainer extends React.PureComponent<IProps, NavLinkProps> {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Drawer title="알림" placement="right" closable={false} visible={false}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>

        <Sider width="250">
          <Header>
            <div
              style={{
                float: "left",
                width: 32,
                height: 31,
                background: "no-repeat url(images/woowabros.png) left/26px",
                margin: "16px 28px 16px -24px"
              }}
            />
            <div
              style={{
                float: "left",
                width: 126,
                height: 31,
                color: "white",
                marginLeft: -20
              }}
            >
              Backoffice 101
            </div>
          </Header>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[this.props.location.pathname]}
            defaultOpenKeys={[
              this.props.location.pathname.split("/").slice(1)[0]
            ]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="dashboard" />
                대시보드
              </Link>
            </Menu.Item>

            <SubMenu
              key="orders"
              title={
                <span>
                  <Icon type="rise" />
                  거래 관리
                </span>
              }
            >
              <Menu.Item key="/orders">
                <Link to="/orders">주문</Link>
              </Menu.Item>

              <Menu.Item key="2">정산</Menu.Item>
            </SubMenu>
            <SubMenu
              key="event"
              title={
                <span>
                  <Icon type="gift" />
                  이벤트
                </span>
              }
            >
              <Menu.Item key="1">이벤트 대시보드</Menu.Item>
              <Menu.Item key="2">이벤트 리스트</Menu.Item>
            </SubMenu>
            <SubMenu
              key="setting"
              title={
                <span>
                  <Icon type="setting" />
                  설정
                </span>
              }
            >
              <Menu.Item key="1">
                <Link to="/settings/users">사용자 관리</Link>
              </Menu.Item>
              <Menu.Item key="2">권한 관리</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ backgroundColor: "#fff" }}>
            <Row
              type="flex"
              align="middle"
              style={{
                paddingTop: 5,
                paddingBottom: 10
              }}
            >
              <Col style={{ flex: 1 }}>{this.props.children}</Col>
            </Row>
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
