import { Model } from 'mongoose';

export type TUser = {
  id: string;
  name: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  status: string;
  phone: number;
  address: string;
  role:
    | 'user'
    | 'admin'
    | 'eventManager'
    | 'entertainManager'
    | 'eventManager'
    | 'travelManager';
  time: string;
  createdAt: Date;
  isDeleted?: boolean;
};

//for custom static method
export interface UserStaticMethod extends Model<TUser> {
  isUserExist(email: string): Promise<TUser | null>;
}

//for custom instance method
// export type UserMethod = {
//   isUserExist(email: string): Promise<TUser | null>;
// };

export type UserModel = Model<TUser>;
