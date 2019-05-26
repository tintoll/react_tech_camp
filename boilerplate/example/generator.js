const fetch = require('node-fetch');


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