## 6일차 -  로그인 & 로그아웃 및 멀티 레이아웃



### 인증 실패시 /login 라우터로 이동 

로그인 인증이 되어 있는 사용자만 페이지가 보여야 하는 경우가 많이 있다. 

이럴 경우 라우터 Wrapping한 컴포넌트를 만들고 그 컴포넌트에서 인증관련된 부분을 수행하는 부분을 공통으로 만들어 사용하는 방법으로 구현한다.

```typescript
// 인증이 되어야 하는 라우터를 PrivateRoute로 정의를 해줌.
<BrowserRouter>
  <Switch>
  	<DefaultLayout>
  		<Switch>
  			<Route exact path="/" component={Pages.Dashboard} />
   			<PrivateRoute exact path="/orders" page={Pages.Order} />
	      <Route component={Pages.PageNotFound} />
      </Switch>
		</DefaultLayout>
	</Switch>
</BrowserRouter>



// PrivateRoute.tsx 
import * as React from 'react';
import { IStoreState, IAuthentication } from "../store";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";


// 타입형식으로 타입정의 방법
// 아래 타입인지 어떻게 알았냐하면 RouteProps 인터페이스를 보고 정의 한 것임 
type RoutePageComponent = React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
interface IProps {
  page: RoutePageComponent;
}
interface IStateToProps {
  authentication : IAuthentication;
}

// mapStateToProps 2개의 인자를 받게끔 되어 있다. 
// 하지만 두번째 인자는 사용할일이 많이 없어서 지금까지 하나만 사용했다.

// 두번째 인자는 순수 컴포넌트에 사용된 props 가져올때 사용한다고 한다. 
// 첫번째는 store에 있는 객체를 가져올때 상용되고 
const mapStateToProps = (
  state:IStoreState, 
  ownProps : IProps
): IProps & IStateToProps => ({
  ...state,
  ...ownProps
});

// 타입을 여러개 사용할 경우 <IProps & IStateToProps & RouteProps> 게 기술하면된다. 
const PrivateRoute: React.FC<IProps & IStateToProps & RouteProps> = props => {
  // 외부에서 컴포넌트를 page 속성으로 보내주는데 Page컴포넌트로 만들어주는 이유는 여러 props들을 쉽게 
  // 풀어주기 쉬어서이다  ex) <Page {...props} />;
  const Page : RoutePageComponent = props.page;
  const { authentication } = props;
  
  return (
    <Route
      {...props}

      // 렌더링할 부분을 함수로 구현을 할수 있음.
      render={props=>{
        if (authentication.token) {
          return <Page {...props} />;
        } else {
          return (
            // 인증이 안되 있을 경우 로그인 라우터로 이동 
            // state 값을 설정하여 현재 어떤 라우터에서 이동되어 왔는지를 설정
            // 로그인한 다음 현재 라우터로 다시 돌아오기 위해서 
            <Redirect 
              to={{
                pathname : '/login',
                state : { from : props.location}
              }}
            />
          )
        } 
      }}
    >

      {props.children}
    </Route>
  )
}

export default connect(mapStateToProps)(PrivateRoute);

```

#### antd를 이용한 테이블 구현

```typescript
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
```



#### antd로 전체화면에 중앙에 로그인 화면 붙이기

```typescript
<Row
      type="flex"
      justify="space-around"
      align="middle"
      style={{
        height : "100vh"
      }}
    >
      <Col>{props.children}</Col>
</Row>
```



#### 멀티레이아웃

```typescript
		<BrowserRouter>
      <NotificationContainer />
      <Switch>
      	// 로그인은 전체사이즈를 구현하기 위해 FullSizeLayout을 구현 
        // component속성말고 children으로 컴포넌트를 설정할수도 있다.
        <Route exact path="/login">
          <FullSizeLayout>
            <Pages.Login />
          </FullSizeLayout>
        </Route>

        <DefaultLayout>
          <Switch>
            <PrivateRoute exact path="/" page={Pages.Dashboard} />
            <PrivateRoute exact path="/orders" page={Pages.Order} />
            <Route component={Pages.PageNotFound} />
          </Switch>
        </DefaultLayout>
      </Switch>
    </BrowserRouter>
```



#### antd에서 Form 관련 처리 

```typescript
import * as React from 'react';
import { IAuthentication } from "../store";
import { Card, Form, Icon, Input, Button, Checkbox } from "antd";
import { Redirect } from "react-router-dom";

export interface ILoginComponentProps {
  authentication: IAuthentication | null;
  requestLogin(username:string, password:string) : void;
}

interface IProps {
  form : any;
}

class LoginComponent extends React.PureComponent<IProps & ILoginComponentProps> {
  onSubmit = (event:any) => {
    event.preventDetault();

    // antd Form에서 validatation을 해준다. 
    this.props.form.validateFields((err:any, values:any) => {
      if(err) return;

      this.props.requestLogin(values.username, values.password);
    });
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    if(this.props.authentication) {
      return (
        <Redirect 
          to={{
            pathname : "/"
          }}
        />
      )
    }
    return (
      <Card
        style={{
          width: 400,
          padding: 30
        }}
      >
        <Form
          onSubmit={this.onSubmit}
          style={{
            maxWidth: 300
          }}
        >
          <Form.Item>
          
            {
          		getFieldDecorator("username", {
              rules: [{ required: true, message: "아이디좀..." }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "black", opacity: 0.2 }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "비번좀..." }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "black", opacity: 0.2 }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {
           	 // valuePropName에 어떤 속성으로 체크표시하는지 정해줘야한다.
             // Input은 안해줘도됨.
            	getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>나 좀 기억해줘</Checkbox>)}
            <br />
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%"
              }}
            >
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

}
// antd의 Form관련 처리를 위해서 Form.create로 Wrapping해줘야한다. 
export const Login = Form.create({name:"loginForm"})(LoginComponent);
```



#### redux-saga 에서 store 정보 가져오는 effect

```javascript
let { authentication } = yield select();
```





#### 리덕스 생성 옵션

```typescript
// createStore에서 2번째 인자가 함수면 미들웨어로 인식하고, 객체이면 초기상태값으로 인식한다.
// 이부분에 인증정보를 넣어주면 새로고침시 로그인이 안되어 있다가 다시 로그인되는 모습이 안보인다. 
const store = createStore(
  reducer,
  authenticationData
    ? {
        ...initializeState,
        authentication: { ...JSON.parse(authenticationData) }
      }
    : initializeState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
```

