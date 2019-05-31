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
  authentication : IAuthentication | null;
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
        if (authentication) {
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
