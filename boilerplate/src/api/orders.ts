import axios, { AxiosResponse } from "axios";
import endpoint from "./endpoint.config";

interface RequestSuccessResp {
  status: string;
}

interface numberOfSuccessfulOrderResp extends RequestSuccessResp {
  result: {
    success: number;
  };
}

interface numberOfFailedOrderResp extends RequestSuccessResp {
  result: {
    failure: number;
  };
}

export function fetchNumberOfSuccessfulOrder(): Promise<
  numberOfSuccessfulOrderResp
> {
  // 한번 더 Wrapping 해준거임. axios에서 다른걸로 변경하기 쉽게
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint.orders.request.success)
      .then((resp: AxiosResponse) => resolve(resp.data))
      .catch(reject);
  });
}

export function fetchNumberOfFailedOrder(): Promise<numberOfFailedOrderResp> {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint.orders.request.failure)
      .then((resp: AxiosResponse) => resolve(resp.data))
      .catch(reject);
  });
}
