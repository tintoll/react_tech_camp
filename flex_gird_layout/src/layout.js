import React from "react";
import randomColor from "randomcolor";
import * as Antd from 'antd';

export const Row = ({children, ...args}) => (
  <Antd.Row {...args}>{children}</Antd.Row>
)

export const Col = ({children, ...args}) => {
  
  let child, container = false;
  if(children.length) {
    child = Array.prototype.map.call(children, (node, i) => {
      if(node.type !== Num) return node;
      container = true;
      return <Num key={i} container>{`C${node.props.children}`}</Num>
    })
  }else {
    child = children;
  }

  return (
    <Antd.Col {...args}
      style={{
        padding: container ? 10 : 0,
        backgroundColor : randomColor({
          luminosity : container ? "dart" : "light"
        })
      }}
    >
      {children}
    </Antd.Col>
  );
}

export const Num = ({ children, container = false }) => {
  const styles = container
    ? {
      display: "inline-block",
      width: 30,
      height: 6,
      marginLeft: 0,
      backgroundColor: "black",
      borderRadius: 3,
      border: "1px solid #333"
    }
    : {
      display: "inline-block",
      fontSize: 10,
      margin: 10,
      padding: "3px 8px 3px 8px",
      fontWeight: "bold",
      backgroundColor: "#ddd",
      borderRadius: 6,
      border: "2px solid #888"
    };

  return (
    <Antd.Typography.Text style={styles}>
      {container ? <span /> : children}
    </Antd.Typography.Text>
  );
};