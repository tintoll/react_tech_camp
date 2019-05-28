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

export interface IStoreState {
  monitoring: boolean;
  showTimeline: boolean;
  duration: number;
  notifications: INotification[];
  success: number;
  failure: number;
  successTimeline: ITimelineItem[];
  failureTimeline: ITimelineItem[];
}
