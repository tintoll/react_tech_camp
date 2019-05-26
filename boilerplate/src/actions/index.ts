import { createAction } from "typesafe-actions";
import { resolve } from "q";

export const startMonitoring = createAction(
  "@command/monitoring/start",
  resolve => {
    return () => resolve();
  }
);

export const stopMonitoring = createAction(
  "@command/monitoring/stop",
  resolve => {
    return () => resolve();
  }
);

export const updateOrderStatus = createAction(
  "@update/order/status",
  resolve => {
    return (success: number, failure: number) => resolve({ success, failure });
  }
);
