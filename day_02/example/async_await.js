function foo() {
  return new Promise(resolve => {
    setImmediate(() => {
      resolve(100);
    }, 1000);
  });
}

// foo().then(r => console.log(r));
// 위의 문법을 아래와 같이 하고 싶다.
// const result = await foo();

async function main() {
  const result = await foo();
  console.log(result);
}
main();

// 제너레이터로 구현하기
function* main2() {
  const result = yield foo();
  console.log("result : ", result);
}

const generator = main2();
const lt = generator.next();
// 일반적을 runner라고 부른다고함.
console.log(lt); // Object
lt.value
  .then(r => {
    generator.next(r);
  })
  .catch(err => generator.throw(err)); // iterator는 throw()함수도 있음.

// iterator는 throw()함수도 있음.
// iterator는 return()도 있음.: 비동기 작업하다기 캔슬할때 사용할수 잇음.
