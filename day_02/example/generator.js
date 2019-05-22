// 제너레이터 함수
// 코루틴의 일종이다.
function* foo() {
  // yield 10; // 값을 줄수 있다 .
  yield;
  return 100;
}

const result = foo();
console.log(result); // 제너레이터가 넘어온다.
// 반복자 인터페이스를 가지고 있는

// 이때 함수를 실행한다. 언제까지 실행하냐? return을 만나거나  yield를 만날때까지
console.log(result.next()); // object({ value:null ,done: false}) false이면 아직 안끝났다.
console.log(result.next()); // object({ value:100 ,done: true})
console.log(result.next()); // undefined

// 제너레이터는 무한 루프를 타도 된다고 함다.
function* foo2() {
  let v = 0;

  // yield* [1,2,3]; // 뒤를 순회하면서 실행됨

  while (true) {
    const r = yield ++v;
    console.log("r : ", r);
  }
}

// next(값을 넣으면) 함수에 들어간다.
const result2 = foo2();
console.log(result.next());
console.log(result.next(2));
