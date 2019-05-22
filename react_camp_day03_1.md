## Promise

- Promise는 ES6에서 비동기 처리를 다루기 위해 사용되는 객체이다. 

```javascript
// 1초뒤에 콘솔에 기록하는 함수 
function printLater(number) {
    setTimeout(
        function() { 
            console.log(number); 
        },
        1000
    );
}

printLater(1); // 호출하면 1초뒤에 콘솔에 기록된다. 

// 위와 같이 한번만 호출하면 별 문제가 없지만 
// 아래와 같이 비동기 작업이 많아지면 복잡해지면서 콜백지옥에 빠지게 된다. 
printLater(1, function() {
    printLater(2, function() {
        printLater(3, function() {
            printLater(4);
        })
    })
})
```

- 위과 같은 콜백지옥을 해결해 주는 것이 Promise 이다

```javascript
// Promise 사용
function printLater(number) {
    return new Promise( // 새 Promise 를 만들어서 리턴함
      	 // 확정이라는 resolve 함수와 실패라는 reject 함수를 파라미터로 받는다. 
        (resolve, reject) => { 
          // 비동기 처리   
          setTimeout( () => {
            if(number > 5) { return reject('number is greater than 5'); } 
            resolve(number+1); // 현재 숫자에 1을 더한 값을 반환합니다
            console.log(number);
            
            // 호출은 되나 무시된다.resolve를 먼저 하여 리턴 되었기 때문이다. 
            reject('실패'); 
          },1000);
        }
    )
}

printLater(1)
.then(num => printLater(num))
// then 함수에는 인자로 2개를 받을 수가 있는데 첫번째는 resolve 된 함수를 넣어 준다. 
// 두번째는 reject된 함수가 올수 있다. 이 인자로 에러처리를 할수 있다. 
.then(num => printLater(num))
.then(num => printLater(num))
.then(num => printLater(num))
.then(num => printLater(num))
.then(num => printLater(num))
.then(num => printLater(num))
// then에서 에러처리가 안되면 디폴트 에러(err) => throw(err); 가 발생하다가 마지막으로 catch를 타게 되는데 여기에서 에러처리를 할 수 있다.
// 에러처리는 then에서 하지 않고 catch에서 하는 방법이 많이 사용된다. 
.catch(e => console.log(e));


// 2개가 동시에 실행해서 결과를 받을 수 있다.
const p1 = printLater(1);
const p2 = printLater(1);
Promise.all([p1, p2]).then(r => console.log(r)).catch()

```





##  Interation Protocol

ES6에 도입된 이터레이션 프로토콜은 데이터 컬렉션을 순회하기 위한 프로토콜이다. 이터레이션 프로토콜을 준수한 객체는 for .. of 문으로 순회할 수 있고 Spreed 연산자의 피연산자가 될 수 있다. 

> 이터러블은 **Symbol.iterator 메소드**를 구현하거나 프로토타입 체인에 의해 상속한 객체를 말한다. Symbol.iterator 메소드는 이터레이터를 반환한다. 

```javascript
// 배열
const array = [1,2,3];
// 배열은 Symbol.iterator 메소드를 소유한다.
console.log(Symbol.iterator in array); // true
for(const item of array) {
  console.log(item);
}

// 객체 
const obj = {a : 1, b:2 };
console.log(Symbol.iterator in obj);
// TypeError: obj is not iterable
for (const p of obj) {
  console.log(p);
}


// Symbol.iterator 메소드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();
// 이터레이터 프로토콜을 준수한 이터레이터는 next 메소드를 갖는다.
console.log('next' in iterator); // true
// 이터레이터의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.
console.log(iterator.next()); // {value: 1, done: false}

// next 메소드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할한다. next 메소드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며 이터레이터 리절트 객체를 반환한다.
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```



#### 빌트인 이터러블

> Array, String, Map, Set, TypedArray(Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), DOM data structure(NodeList, HTMLCollection), Arguments



#### 이터레이션 프로토콜의 필요성

이터러블은 데이터 공급자(Data provider)의 역할을 한다. 

만약 빌트인 이터러블의  다양한 데이터 소스가 각자의 순회 방식을 갖는다면 데이터 소비자는 다양한 데이터 소스의 순회 방식을 모두 지원해야 한다. 이는 효율적이지 않다. 하지만 다양한 데이터 소스가 이터레이션 프로토콜을 준수하도록 규정하면 데이터 소비자는 이터레이션 프로토콜만을 지원하도록 구현하면 된다.



#### for … of 문

for…of 문은 내부적으로 이터레이터의 next 메소드를 호출하여 이터러블을 순회하며 next 메소드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for…of 문의 변수에 할당한다. 그리고 이터레이터 리절트 객체의 done 프로퍼티 값이 false이면 이터러블의 순회를 계속하고 true이면 이터러블의 순회를 중단한다



#### 커스텀 이터러블 구현

일반 객체는 이터러블이 아니다. 일반 객체는 Symbol.iterator 메소드를 소유하지 않는다. 즉, 일반 객체는 이터러블 프로토콜을 준수하지 않으므로 for…of 문으로 순회할 수 없다.

```javascript
// 피보나치 

// 이터러블을 반환하는 함수
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  return {
    // Symbol.iterator 메소드를 구현하여 이터러블 프로토콜을 준수
    
    // Java에서 new Interface( override 구현)와 비슷 한거같다.
    //  [Symbol.iterator]이 나오는 데 이건 그냥 반복되는 규칙을 내부적으로 처리하는 것을 만드는 부분이라고 생각하시면 됩니다. 
    // Symbol 자체가 자바스크립트 내부에서 일어나는 일에 접근할 수 있는 값이거든요. 그 중에서 iterator 속성은 반복을 담당합니다
    [Symbol.iterator]() { 
      // Symbol.iterator 메소드는 next 메소드를 소유한 이터레이터를 반환해야 한다.
      // next 메소드는 이터레이터 리절트 객체를 반환
      return {
        // fibonacci 객체를 순회할 때마다 next 메소드가 호출된다.
        next() {
          [pre, cur] = [cur, pre + cur];
          return {
            value: cur,
            done: cur >= max
          };
        }
      };
    }
  };
};

// 이터러블을 반환하는 함수에 이터러블의 최대값을 전달한다.
for (const num of fibonacciFunc(10)) {
  console.log(num); // 1 2 3 5 8
}
```



> 이터러블은 데이터 공급자(Data provider)의 역할을 한다. 배열, 문자열, Map, Set 등의 빌트인 이터러블은 데이터를 모두 메모리에 확보한 다음 동작한다. 하지만 이터러블은 **Lazy evaluation(지연 평가)**를 통해 값을 생성한다. Lazy evaluation은 평가 결과가 필요할 때까지 평가를 늦추는 기법이다. 즉 데이터가 필요할 때까지 데이터의 생성을 지연하다가 데이터가 필요한 순간 데이터를 생성한다. 



## Generator

iterator의 단점 한번 생성하면 그저 무한히 반복할 뿐입니다. 이러한  단점을 보안하기 위해 나온게 Generator 이다



제너레이터(Generator) 함수는 이터러블을 생성하는 함수이다. 제너레이터 함수를 사용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하 방식보다 간편하게 구현할 수 있다. 또한 제너레이터 함수는 비동기 처리에 유용하게 사용된다. 

```javascript
// 이터레이션 프로토콜을 구현하여 무한 이터러블을 생성하는 함수
const createInfinityByIteration = function () {
  let i = 0; // 자유 변수
  return {
    [Symbol.iterator]() { return this; },
    next() {
      return { value: ++i };
    }
  };
};
for (const n of createInfinityByIteration()) {
  if (n > 5) break;
  console.log(n); // 1 2 3 4 5
}


// 무한 이터러블을 생성하는 제너레이터 함수
function* createInfinityByGenerator() {
  let i = 0;
  while (true) { yield ++i; }
}
for (const n of createInfinityByGenerator()) {
  if (n > 5) break;
  console.log(n); // 1 2 3 4 5
}
```



제너레이터 함수는 일반 함수와 같이 함수의 **코드 블록을 한 번에 실행하지 않고 함수 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재시작할 수 있는 특수한 함수**이다.

```javascript
function* counter() {
  yield 1;                  // 첫번째 호출 시에 이 지점까지 실행된다.
  yield 2;                  // 두번째 호출 시에 이 지점까지 실행된다. 

  // yield*을 할 수도 있습니다. 해당 값을 자동으로 쪼개 반복합니다.(Symbol.iterator가 있는 값들만 쪼갤 수 있습니다) 문자열이나 배열, 다른 반복기 값을 넣을 수 있습니다. 이게 다른 점이죠.
  yield* [4, 5, 6];

  let inValue = yield;
  console.log('inValue : ', inValue);
  inValue = yield;
  console.log('inValue : ', inValue);
}

const generatorObj = counter();
console.log(generatorObj.next()); // {value: 1, done: false}
console.log(generatorObj.next()); // {value: 2, done: false}
console.log(generatorObj.next()); // {value: 4, done: false}
console.log(generatorObj.next()); // {value: 5, done: false}
console.log(generatorObj.next()); // {value: 6, done: false}
// next를 통해 생성기에 값을 전달해줄 수도 있습니다. 전달해준 값은 yield가 받습니다. 
// yield가 받은 값과 next로 나오는 값은 별개입니다. 또 첫 번째 값 전달은 무시된다는 것을 기억하세요!
console.log(generatorObj.next(8));
console.log(generatorObj.next(9));
console.log(generatorObj.next()); // {value: undefined, done: true}
```

일반 함수를 호출하면 return 문으로 반환값을 리턴하지만 **제너레이터 함수를 호출하면 제너레이터를 반환**한다. 이 **제너레이터는 이터러블(iterable)이면서 동시에 이터레이터(iterator)인 객체이다.** 다시 말해 제너레이터 함수가 생성한 제너레이터는 Symbol.iterator 메소드를 소유한 이터러블이다. 그리고 제너레이터는 next 메소드를 소유하며 next 메소드를 호출하면 **value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 이터레이터**이다.



#### 비동기 처리

제너레이터를 사용해 비동기 처리를 동기 처리처럼 구현할 수 있다. 다시 말해 비동기 처리 함수가 처리 결과를 반환하도록 구현할 수 있다.

```javascript
const fetch = require('node-fetch');

function getUser(genObj, username) {
  fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    // 1.제너레이터 객체에 비동기 처리 결과를 전달한다.
    .then(user => genObj.next(user.name));
}

// 제너레이터 객체 생성
const g = (function* () {
  let user;
  // 2. 비동기 처리 함수가 결과를 반환한다.
  // 비동기 처리의 순서가 보장된다.
  user = yield getUser(g, 'jeresig');
  console.log(user); // John Resig

  user = yield getUser(g, 'ahejlsberg');
  console.log(user); // Anders Hejlsberg

  user = yield getUser(g, 'ungmo2');
  console.log(user); // Ungmo Lee
}());

// 제너레이터 함수 시작
g.next();
```

비동기 처리의 순서가 보장되서 동기 코드처럼 보이게 할수 있다. Generator 단점은 async 함수를 매번 구현해줘야 한다는 건데요.  **async/await**로 해결됩니다. 

#### interator과 다른 점은 return과 throw를 호출할 수도 있습니다. 

generator.return();하는 순간 생성기는 멈추고, done은 true가 됩니다. 반복을 멈추고 싶을 때 사용하면 됩니다. 

generator.throw();는 return처럼 생성기를 종료하고, 추가로 에러를 만들어냅니다. 따라서 try catch 구문에서 catch로 보낼 수 있습니다.



## Async-await

```javascript
const fetch = require('node-fetch');

// Promise를 반환하는 함수 정의
function getUser(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user => user.name);
}

async function getUserAll() {
  let user;
  user = await getUser('jeresig');
  console.log(user);

  user = await getUser('ahejlsberg');
  console.log(user);

  user = await getUser('ungmo2');
  console.log(user);
}

getUserAll();
```



