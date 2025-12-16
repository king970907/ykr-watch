export interface IVideo {
  url: string;
  playing: boolean;
  played: number; // 0 to 1
  volume: number;
  lastUpdated: number;
}
