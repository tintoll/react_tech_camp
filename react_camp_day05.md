## 레이아웃

antd가 제공하는 레이아웃은 2종류가 있다. 

1. Grid

   1. 24컬럼 Grid 시스템 방식을 사용

      ```javascript
      <Row>
        // span property로 비율을 설정한다. 
        <Col span={24}>
          <Num>1</Num>
      	</Col>
      </Row>
      	// Row의 gutter property로 컬럼간의 간격을 줄 수 있다. 
      <Row gutter={16}>
          <Col span={12}>
            <Num>1</Num>
      	</Col>
        <Col span={12}>
          <Num>2</Num>
        </Col>
      </Row>
      ```

2. Flexbox

   1. Grid와 Flexbox는 원래 혼용해서 사용하지 않는다. 하지만  antd에서는 Grid안에 Flexbox를 넣는 형태로 구성되어 있다. 

      ```javascript
      <Row type="flex" justify="center" align="top">
        // offset 설정하여 왼쪽/오른쪽 정렬을 할 수가 있다.
        <Col span={12} offset={12}>
          <Num>1</Num>
      	</Col>
      </Row>
      ```

      

## 라우팅

리액트에서 라우팅기능을 사용하기 위해서는 react-router  package를 사용했는데 4.0부터 구조가 완전히 변경되면서(많은 라우팅기능을 제공하기 위해서) react-router-dom package를 설치 해서 사용해야 함. 



#### BrowserRouter

라우팅을 하기 위해서는 <BrowserRouter>로 라우팅하고자 하는 부분을 감싸주어야 한다.

```javascript
<BrowserRouter>
	// 공통되는 부분(사이드 바) 컴포넌트를 따로 만들어서 처리를 해주면된다.
	<DefaultLayout>
    // exact를 안하면 switch문의 break를 만나기전까지 모두 실행되는것처럼 아래가 다 실행된다. 
    <Route exact path="/" component={Page.DashBoard} /> 
    <Route exact path="/order" component={Page.Order} /> 
	</DefaultLayout>
</BrowserRouter>
```



#### Switch

Switch는 2가지 동작을 합니다. 

1. Route가 매칭 되면 나머지는 실행을 안하도록 동작합니다.
   1. Switch로 안묶어주면 순차적으로 다 실행되는 된다. 
2. 어떤 경로로 들어왔는지를 기록해주는 역할을 한다.
   1. NavLinkProps에 location 정보를 가지고 있다. 

```javascript
<BrowserRouter>
  		// 경로 지정을 위해사용
      <Switch> 
        <DefaultLayout>
          // Route 매칭이 되면 나머지 실행이 안되도록 하기 위해서 사용 
  				<Switch>
            <Route exact path="/" component={Pages.Dashboard} />
            <Route exact path="/orders" component={Pages.Order} />
            // 404페이지 
            <Route component={Pages.PageNotFound} />
          </Switch>
        </DefaultLayout>
      </Switch>
    </BrowserRouter>
```



## Tip

> UI를 구성할때 컴포넌트를 처음부터 나누려고 하지말고 한 컴포넌트에 구성을 한 다음 하나씩 나누는 방식으로 작업하는게 더 빠를것이다. 

> 디렉토리 구조를 잡을때 pages 폴더는 화면에 대한 컴포넌트만 있고 containers 폴더에는 store를 연결하는 컴포넌트들만 모아 놓는 구조를 많이 사용한다. 
>
> 하지만 pages 폴더에있는 컴포넌트로 store를 사용해야 하는 경우도 발생할 수 있다. 



#### import 할때 {} 없이 사용하기 

index.ts에서 해당 폴더에 대한 파일을 모아서 사용할때 대부분 ``export const`` 로 내보내서 ``import { .. }``로 불러왔었는데 {}를 없이 사용할 수 있다. 

```javascript
// 404.tsx
const PageNotFound: React.FC = () => (
  <div style={{ fontSize: 220, textAlign: "center" }}>404</div>
);
export default PageNotFound;

// index.ts
export { default as Dashboard } from "./Dashboard";
export { default as Order } from "./Order";
export { default as PageNotFound } from "./404";

// 위와같이 사용하면 import 할때 {} 없이 사용할 수 있다.
import PageNotFound from '../pages';
```

