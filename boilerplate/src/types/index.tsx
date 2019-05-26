export interface StoreState {
  monitoring: boolean;
  monitoringDuration: number;
  success: number;
  failure: number;
  notifications: INotification[];
}

export interface INotification {
  id : number;
  type : string;
  msg : string;
}
