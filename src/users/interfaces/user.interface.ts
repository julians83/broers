export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  createdAt?: Date;
  isActive: boolean;
}
