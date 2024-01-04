export interface IUser {
  id: number;
  user_name: string;
  role: string;
  parent_user_id?: number;
  active_status: string;
}