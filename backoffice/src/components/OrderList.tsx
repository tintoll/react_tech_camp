import * as React from 'react';
import { Table, Divider, Tag } from "antd";


const columns = [
  {
    title: "No",
    dataIndex: "No",
    key: "No",
    // render 함수를 이용하여 컴포넌트 디자인을 할수 있다.
    render: (no:any) => <a href="javascript:;">{no}</a>
  },
  {
    title: "Date",
    dataIndex: "Date",
    key: "Date"
  },
  {
    title: "업소",
    dataIndex: "Shop",
    key: "Shop"
  },
  {
    title: "주문메뉴",
    key: "Menus",
    dataIndex: "Menus",
    render: (menus: any) => (
      <span>
        {menus.map((menu: any) => {
          let color = menu.includes("치킨") ? "volcano" : "green";
          return (
            <Tag color={color} key={menu}>
              {menu.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    // render 함수의 첫번째인자는 현재 자신의 키값이고 두번째는 columns에 모든 객체값이다.
    render: (text:string, record:any) => (
      <span>
        <a href="javascript:;">{record.No} 주문 취소 </a>
        <Divider type="vertical" />
        <a href="javascript:;">삭제</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    No: "OD001",
    Date: "2019-05-30 17:53:24",
    Shop: "처갓집양념치킨 풍납점",
    Menus: ["더 화이트 치킨 순살", "후라이드치킨"]
  },
  {
    key: "2",
    No: "OD002",
    Date: "2019-05-30 17:54:14",
    Shop: "쌀통닭 길동점",
    Menus: ["쌀통닭", "1980양념", "똥집세트1"]
  },
  {
    key: "3",
    No: "OD003",
    Date: "2019-05-30 17:55:59",
    Shop: "청 치킨 본점",
    Menus: ["애플파닭"]
  }
];
// antd의 테이블은 <Table>의 속성에 
// columns에 해당되는 데이터와 dataSource에 대한 데이터만 넣어주면 쉽게 구현할수 있다.
export const OrderList : React.FC = () => (
  <Table columns={columns} dataSource={data} />
)