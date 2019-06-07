import uuid from "uuid/v4";

export const createAsyncPayload = (payload = {}, prefix = "") => ({
  ...payload,
  aysncTaskId: `${prefix}${uuid()}`
});

export const isAsycAction = (action: any) => !!action.payload.aysncTaskId;

export const getAsyncId = (action: any) => action.payload.aysncTaskId;
