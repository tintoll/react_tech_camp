import { fork, all, take, select, delay, put, call } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import * as Actions from "../actions";
import * as Api from "../api/orders";

function* monitoringWorkflow() {
  while (true) {
    yield take(getType(Actions.startMonitoring));

    let polling = true;

    while (polling) {
      // saga의 모든 effect들은 모두 객체를 리턴하기 때문에 yield Api.fetchNumberOfSuccessfulOrder() 게 호출해도 되는데
      // call로 감싸는 이유는 테스트 때문이다. (목킹하기가 쉽다.Promise는 목킹하기 어렵다. )

      // 동기적으로 동작하는 wating을 함. all
      const [succResp, failResp] = yield all([
        call(Api.fetchNumberOfSuccessfulOrder),
        call(Api.fetchNumberOfFailedOrder)
      ]);
      // const [,b,c] = [1,2,3]; // 첫번째꺼는 사용 안할때

      yield put(
        Actions.updateOrderStatus(
          succResp.result.success,
          failResp.result.failure
        )
      );

      const { monitoring, monitoringDuration } = yield select();
      if (!monitoring) {
        polling = false;
      }

      yield delay(monitoringDuration);
    }
  }
}

export default function*() {
  // 비동기적 waiting
  yield fork(monitoringWorkflow);
}
