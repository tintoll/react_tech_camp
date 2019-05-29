import * as React from "react";
import {
  Row,
  Col,
  Button,
  Avatar,
  Badge,
  Icon,
  Input,
  PageHeader as Header
} from "antd";

interface IProps {
  label?: string;
}

export const PageHeader: React.FC<IProps> = ({ label }) => {
  return (
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
        <Header
          title={<span>{label}</span>}
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
  );
};
