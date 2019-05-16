#### 강의 교안 사이트

- https://codebrew.kr/

- javascript 기본 문법 설명 사이트 : http://woowabros-play-javascript.herokuapp.com/	

- 강의 교안사이트 구성이 하나의 단계를 나아가는 형태로 구성되어 있어서 현재 버전과 다음 버전에 변경되는 부분을 알아가면서 공부하면 좋다

  

##### React 프로젝트 설치 

```shell
# create-react-app을 이용
$ npx create-react-app hello-react --typescript
$ yarn create react-app my-app --typescript

$ yarn start
```



> 타입 스크립트는 무조건 타입이 있어야 하기 때문에 React를 불러올때 아래와 같이 ``* as``를 해줘야 한다.  React도 타입스크립트로 만들어진게 아니기때문이다.  ``@types/react, @types/react-dom``를 추가 해주면 이전과 동일하게  사용할수 있다.

```javascript
// typescript
import * as React from "react";
import * as ReactDOM from "react-dom";

// javascript
import React from 'react';
import ReactDOM from "react-dom";
```



> JSX, TSX 를 사용하는 부분(UI요소)에는 무조건 ``import * as React from 'react';`` 가 포함되어 있어야 babel이 javascript로 트랜스파일링 해준다. 



#### 컴포넌트 종류

- 라이프 사이클을 있냐/없냐 로 구분 되어 있다. 

1. Component : 모든 기능을 다 포함하고 있는 컴포넌트

2. PureComponent : PureComponent 는 Component 와 동일하게 동작합니다. 다만, 순수 컴포넌트는 당신을 위해 shouldComponentUpdate 함수를 다뤄준다는 게 하나의 차이점입니다. 

3. Functional Component(FC) : 

   1. 상태(state)를 포함하지 않을때 많이 사용. 
   2. 라이프 사이클 함수를 사용할 수 없다.

   ```javascript
   // <div> 이런 태그 하나하나가 다 컴포넌트이다. 소문자로 시작하는것은 html태그를 컴포넌트로 만들어 놓은것이다.
   // <Sub></Sub> 맨앞 대문자로 시작하는것을 기본 컨벤션 규칙으로 사용한다.
   const App: React.FC = () => {
   	return(
   		<div> 
   			<Sub></Sub> 
   		</div>
   	);
   }
   ```



> state : 컴포넌트 자체적으로 가지고 있는 상태(변하는 값)을 state라고 한다.
>
> props : 외부에서 데이터를 받아 들이는 값(변하지 않는값)을 props라고 한다.



#### 타입스크립트의 타입을 정의하는 방법

- 2가지가 있다.  둘다 사용법은 비슷하다.

1. interface

   ```typescript
   interface PlayButtonProps {
     monitoring: boolean; // 세미콜론으로 끈난다. 
     onPlay?: () => void; // ?는 받아도 되고 안받아도 되는 옵션
     onPause?: () => void;
   }
   // props의 타입을 정의한 interface를 제네릭으로 설정한다.
   export const PlayButton: React.FC<PlayButtonProps> = props => {
   	return (
       <div>
       	<button
       		onClick={() => {
             if (isPlay) {
             	// 첫번째 인자가 false면 아예 실행을 안함
             	// javascript는 onPause()를 실행할때 함수인지 아닌지 체크해야 하는데
             	// 타입스크립트는 타입을 체크했기때문에 안해도 된다. 
               props.onPause && props.onPause();
             } else {
               props.onPlay && props.onPlay();
             }
   
             togglePlay(!isPlay);
           }}
       	>확인</button>
       </div>
     );
   }
   ```

2. Type



#### 기타 알게된 내용

##### 컴포넌트 속성 값 설명

```typescript
// 컴포넌트 속성을 정의할때 문자열은 ""로 값을 정의 할수 있다. 
// {}는 javascript의 값을 줄때 사용
// {{}}는 javascript 객체 값을 의미한다. 
<Card
      bordered={false}
      bodyStyle={{		
        background: "#fff",
        padding: "24px"
      }}
    >
      <div className="wrapper"> 
      </div>
</Card>      
```

##### 타입스크리트에서 리턴타입지정하는 방법 

```typescript
const formattedNumber = (value: number): string =>
    String(value).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
```

#### 클래스 인스턴스 변수 선언 및 사용

```typescript
interface Application {
  timerId: number;
  state: {
    success: number;
    failure: number;
  };
  onStart(): void;
  onStop(): void;
}
// 제네릭으로 사용해도된다. React.Component<Application>
class App extends React.Component implements Application {
 	timerId: number = 0; // 인스턴스의 멤버로 만들어짐 
 	// 정적변수는 static을 분여야함. 
	
  ...
  // 함수를 사용할때는 arrow 함수를 사용해야한다. 
  // 일반 함수를 사용하면 this의 컨텍스트가 변경될수 있어서 있다. 
  // arrow함수는 this의 컨텍스트가 고정이다
  onStart = () => {
  	   this.timerId = 11;
  } 
}
```

