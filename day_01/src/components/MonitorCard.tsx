import * as React from 'react';
import { Card } from "antd";

interface OrderStatusProps {
  success: number;
  failure: number;
}

export const MonitorCard: React.FC<OrderStatusProps> = props => {
  const errorRate: string = 
    props.failure > 0
    ? Number((props.failure / props.success) * 100).toFixed(2)
    : "0";
  
    // 천자리마라 ,를 붙여주는 함수
  const formatterNumber = (value: number): string => {
    return String(value).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <Card
      bordered={false}
      bodyStyle={{
        background: "#fff",
        padding: "24px"
      }}
    >
      <div className="wrapper">
        <div className="item">
          <p>Success</p>
          <p style={{color : "#000"}}>
            <span>{formatterNumber(props.success)}</span>
          </p>
        </div>

        <div className="item">
          <p>Failure</p>
          <p style={{ color: "#000" }}>
            <span>{formatterNumber(props.failure)}</span>
          </p>
        </div>

        <div className="item">
          <p>Error Rate</p>
          <p style={{ color: "#000" }}>
            <span>{errorRate}</span>
            <span className="unit">%</span>
          </p>
        </div>
      </div>
    </Card>
  );
}