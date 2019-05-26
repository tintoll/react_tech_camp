import * as React from "react";
import { Card } from "antd";

export const MonitorCard: React.FC = props => {
  return (
    <Card
      bordered={false}
      bodyStyle={{
        background: "#fff",
        padding: "24px"
      }}
    >
      <div className="wrapper">{props.children}</div>
    </Card>
  );
};
