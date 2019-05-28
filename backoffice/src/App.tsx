import * as React from "react";
import { OrderStatusContiner, MonitorControllerContainer } from "./containers";

import "./sass/main.scss";
import "antd/dist/antd.css";

import {
  Layout,
  Badge,
  Row,
  Col,
  Menu,
  Input,
  Button,
  PageHeader,
  Avatar,
  Card,
  Icon,
  Drawer,
  Typography
} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const App: React.FC = () => (
  <div style={{ minHeight: "100vh" }}>
    <Row type="flex">
      <Col style={{ width: 250 }}>
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

        <Sider width="100%" style={{ background: "#fff", height: "100vh" }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["dashboard"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="dashboard">
              <Icon type="dashboard" />
              대시보드
            </Menu.Item>

            <SubMenu
              key="order"
              title={
                <span>
                  <Icon type="rise" />
                  거래 관리
                </span>
              }
            >
              <Menu.Item key="1">주문 시스템</Menu.Item>
              <Menu.Item key="2">정산 시스템</Menu.Item>
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
              <Menu.Item key="1">사용자 관리</Menu.Item>
              <Menu.Item key="2">권한 관리</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </Col>
      <Col style={{ flex: 1 }}>
        <Drawer title="알림" placement="right" closable={false} visible={false}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <Content>
          <Row
            type="flex"
            align="middle"
            style={{
              paddingTop: 5,
              paddingBottom: 10,
              borderBottom: "1px solid #ddd"
            }}
          >
            <Col style={{ flex: 1 }}>
              <PageHeader
                title={<span>대시보드</span>}
                extra={[
                  <Input.Search type="search" style={{ width: 200 }} />,
                  <Button
                    key="2"
                    shape="circle"
                    style={{ border: "none" }}
                    icon="search"
                  />,
                  <Button key="3" shape="circle" style={{ border: "none" }}>
                    <Avatar
                      size="small"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </Button>,
                  <Button shape="circle" style={{ border: "none" }}>
                    <Badge count={3} dot={true}>
                      <Icon type="bell" />
                    </Badge>
                  </Button>
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ padding: 20 }}>
                <main>
                  <Card title="주문">
                    <OrderStatusContiner />
                  </Card>
                </main>
              </div>
            </Col>
          </Row>
        </Content>
      </Col>
    </Row>
  </div>
);

export default App;
