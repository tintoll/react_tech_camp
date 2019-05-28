import {
  all,
  fork,
  take,
  select,
  delay,
  put,
  call,
  takeLatest
} from "redux-saga/effects";
import moment from "moment";
import { getType } from "typesafe-actions";
import * as Actions from "../actions";
import * as Api from "../apis/orders";
import { IStoreState } from "../store";

function* fetchOrderTimeline() {
  const {
    results: { successTimeline, failureTimeline }
  } = yield call(Api.fetchOrderTimeline, moment().format("YYYYMMDD"));

  yield put(Actions.updateOrderTimeline(successTimeline, failureTimeline));
}

function* monitoringWorkflow() {
  while (yield take(getType(Actions.startMonitoring))) {
    let polling = true;

    while (polling) {
      try {
        const [succResp, failResp] = yield all([
          call(Api.fetchNumberOfSuccessfulOrder),
          call(Api.fetchNumberOfFailedOrder)
        ]);

        const { showTimeline }: IStoreState = yield select();

        if (showTimeline) {
          yield fork(fetchOrderTimeline);
        }

        yield put(
          Actions.updateOrderStatus(
            succResp.result.success,
            failResp.result.failure
          )
        );
      } catch (e) {
        if (e instanceof Api.ApiError) {
          yield put(Actions.addNotification("error", e.errorMessage));
        } else {
          console.error(e);
        }
      }

      const { monitoring, duration }: IStoreState = yield select();

      if (!monitoring) {
        polling = false;
      }

      yield delay(duration);
    }
  }
}

function* watchFetchOrderTimeline() {
  yield takeLatest(getType(Actions.showOrderTimelineChart), fetchOrderTimeline);
}

export default function* () {
  yield fork(monitoringWorkflow);
  yield fork(watchFetchOrderTimeline);
}
