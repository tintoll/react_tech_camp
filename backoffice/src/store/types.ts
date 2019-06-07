export interface INotification {
  id: number;
  type: string;
  msg: string;
  show: boolean;
  timestamp: number;
}

export interface ITimelineItem {
  time: string;
  count: number;
}

export interface IAuthentication {
  name: string;
  picture: string | null;
  token: string | null;
}

export interface IShopObj {
  rows: IShop[];
}

export type FinishStatus = "success" | "failure";
export interface IAsyncTaskStatus {
  id: string;
  action: string;
  complete: boolean;
  completeStatus?: FinishStatus;
  timestamp: number;
}
export interface IShop {
  address: string;
  categorey: string;
  createDate: string;
  geoLocation: [];
  id: number;
  ownerName: string;
  phone: string;
  shopName: string;
}

export interface IStoreState {
  authentication: IAuthentication | null;
  monitoring: boolean;
  openNotificationCenter: boolean;
  showTimeline: boolean;
  duration: number;
  notifications: INotification[];
  success: number;
  failure: number;
  successTimeline: ITimelineItem[];
  failureTimeline: ITimelineItem[];
  shopList: IShop[];
  asyncTasks: IAsyncTaskStatus[];
}
