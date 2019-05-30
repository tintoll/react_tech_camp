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

