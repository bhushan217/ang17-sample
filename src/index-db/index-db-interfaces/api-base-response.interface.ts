export interface ApiBaseResponse {
  StatusCode: number;
  Response: any;
  IsSuccessful: boolean;
}

export interface ChunkLoadStrategy {
  _limit: number;
  countEndPoint: string;
  _page: number;
}