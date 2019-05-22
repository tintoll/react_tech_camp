// Promise 사용
function printLater(number) {
  return new Promise( // 새 Promise 를 만들어서 리턴함
    // 확정이라는 resolve 함수와 실패라는 reject 함수를 파라미터로 받는다. 
    (resolve, reject) => {
      // 비동기 처리   
      setTimeout(() => {
        if (number > 5) { return reject('number is greater than 5'); }
        resolve(number + 1); // 현재 숫자에 1을 더한 값을 반환합니다
        console.log(number);

        // 호출은 되나 무시된다.resolve를 먼저 하여 리턴 되었기 때문이다. 
        reject('실패');
      }, 1000);
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