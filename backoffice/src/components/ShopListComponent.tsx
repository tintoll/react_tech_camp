import * as React from "react";
import { Table } from "antd";
import { IShop } from "../store";

interface IProps {
  data: IShop[];
}

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "가게명",
    dataIndex: "shopName",
    key: "shopName"
  },
  {
    title: "주인",
    dataIndex: "ownerName",
    key: "ownerName"
  },
  {
    title: "주소",
    dataIndex: "address",
    key: "address"
  }
];

export const ShopListComponent: React.FC<IProps> = props => (
  <Table columns={columns} dataSource={props.data} />
);
