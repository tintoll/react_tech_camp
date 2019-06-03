import * as React from 'react';
import { connect } from "react-redux";
import { IStoreState, IAuthentication } from "../store";
import { requestLogout, openNotificationCenter } from "../actions";

// 로그인 인증관련된 공통부분을 자식에게 주기위해서 만든 컴포넌트
// connect() 함수는 아래와 비슷한 구조로 구현한라고 보면 된다. 
const AuthWrapper: React.FC<any> = props => {
  const children = React.Children.map(
    props.children,
    (child: React.ReactElement, index: number) => {
      return React.cloneElement(child, { ...props });
    }
  );

  return <React.Fragment>{children}</React.Fragment>;
};

export const AuthContainer = connect(
  (state: IStoreState) => ({
    authentication : state.authentication
  }),
  dispatch => ({
    requestLogout : () => dispatch(requestLogout()),
    openNotificationCenter : () => dispatch(openNotificationCenter())
  })
)(AuthWrapper);