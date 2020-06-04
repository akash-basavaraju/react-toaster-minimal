export interface IToastMessage {
  title: string;
  subTitle?: string;
  textColor?: string;
  bgColor?: string;
  compStyle?: { [key: string]: string };
  closeTimeInMs?: number;
}

export interface IToastMessageState extends IToastMessage {
  timestamp: number;
}

export interface IState {
  toastMessages: IToastMessageState[];
}
