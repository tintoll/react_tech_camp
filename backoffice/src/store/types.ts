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
  name : string;
  picture : string | null;
  token: string | null;
}

export interface IStoreState {
  authentication: IAuthentication | null;
  monitoring: boolean;
  openNotificationCenter : boolean;
  showTimeline: boolean;
  duration: number;
  notifications: INotification[];
  success: number;
  failure: number;
  successTimeline: ITimelineItem[];
  failureTimeline: ITimelineItem[];
}

