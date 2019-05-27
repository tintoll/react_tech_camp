## Boilerplate 05 Api 호출

API에 대한 설정은 초반에 잘 정의해놔야 한다.

App이 커지게 되면 API개수도 많아지고 서버환경도 다양해지기 때문인다. 

```typescript
// API 호출 함수 정의 

export function fetchNumberOfSuccessfulOrder(): Promise<
  numberOfSuccessfulOrderResp
> {
  // 한번 더 Promise로 Wrapping 해준거임. axios에서 다른걸로 변경하기 쉽게 하기 위해서 
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint.orders.request.success)
      .then((resp: AxiosResponse) => resolve(resp.data))
      .catch(reject);
  });
}
```



#### redux-saga 관련

effect에는 2가지 종류가 있다.

- 동기적으로 동작하는 이펙트
  - all
- 비동기적으로 동작하는 이펙트
  - fork

```typescript
// saga의 모든 effect들은 모두 객체를 리턴하기 때문에 yield Api.fetchNumberOfSuccessfulOrder() 게 호출해도 된다. 
// call로 감싸는 이유는 테스트 때문이다. (목킹하기가 쉽다.Promise는 목킹하기 어렵다. )

// 동기적으로 동작하는 wating을 함. all
const [succResp, failResp] = yield all([
  call(Api.fetchNumberOfSuccessfulOrder),
  call(Api.fetchNumberOfFailedOrder)
]);
// const [,b,c] = [1,2,3]; // 첫번째꺼는 사용 안할때

// select는 스토어의 상태를 가져오는 이펙터이다.
// api는 느릴수있기때문에 실제 상태를 보고 polling을 해준다. 
const { monitoring, monitoringDuration } = yield select();
if (!monitoring) {
  polling = false;
}

```



> 리덕스는 동기식으로 동작한다.
> 디스패치하면 바로 실행되서 그 다음줄에 값을 가져오면 변경된 값을 가져온다.



> redux-saga api 호출에 대한 오류 부분은 try ~ catch 에서 잡으면 잡을수 있다. 원래 Promise에러는 promise.catch()에서  해결해야하는데 이부분을  redux-saga에서 해주고 있다 





## Redux-devtools 설정 

```javascript
// 설치
$ npm i redux-devtools-extension


// root.js 설정 
import { composeWithDevTools } from "redux-devtools-extension";

// store 생성시 composeWithDevTools함수로 미들웨어를 감싸줘면된다. 
const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
```





## 컴포넌트 널처리 관련

리액트를 하다보면 어떤 조건일때는 컴포넌트를 안보여주는 경우가 있다. 

이럴경우 ``조건 ? 컴포넌트 :  null`` 이런식으로 많이 사용한다.  이러면  render 부분에서 보기 좋지 않기때문에 해당 부분을 컴포넌트로 만들어 놓으면 편하다.

```typescript
// Maybe.tsx
import * as React from 'react';

interface IProps {
  test : boolean;
  children : React.ReactNode
}

export const Maybe: React.FC<IProps> = ({test, children}) =>(
  <React.Fragment>{test ? children : null}</React.Fragment>
)


// 불러오는 부분에는 아래와 같이 불러오면 된다. 
<Maybe>
	<TinyChart></TinyChart>
</Maybe>
```



