import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Num } from "./layout";

import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <Row>
        <Col span={12}>
          <Num>1</Num>
        </Col>
        <Col span={12}>
          <Num>2</Num>
        </Col>
      </Row>
      <Row gutter={16} >
        <Col span={6}>
          <Num>1</Num>
        </Col>
        <Col span={6}>
          <Num>2</Num>
        </Col>
        <Col span={6}>
          <Num>3</Num>
        </Col>
        <Col span={6}>
          <Num>4</Num>
        </Col>
      </Row>

      <Row type="flex" justify="center" align="top">
        <Col span={12} offset={12}>
          <Num>1</Num>
        </Col>
      </Row>
    </div>
  )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);