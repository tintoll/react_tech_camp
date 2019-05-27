export interface INotification {
  id: number;
  type: string;
  msg: string;
  show : boolean;
  timestamp : number;
}

export interface ITimelineItem {
  time : string;
  count : number;
}

export interface StoreState {
  monitoring: boolean;
  monitoringDuration: number;
  success: number;
  failure: number;
  notifications: INotification[];
  successTimeline : ITimelineItem[];
  failureTimeline : ITimelineItem[];
  showTimeline : boolean;
}


