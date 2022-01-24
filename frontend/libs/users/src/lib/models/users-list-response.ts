import { IUser } from './user';

export interface IUsersListResponse {
  success: boolean;
  users: IUser[]
}
