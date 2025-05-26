import { TUser } from './user.interface';
import { User } from './user.model';

const createUserInDB = async (userData: TUser) => {
  // For Static Method
  if (await User.isUserExist(userData.email)) {
    throw new Error('User already exists!');
  }

  //For Instance Method
  // const IUser = new User(userData);
  // if (await IUser.isUserExist(userData.email)) {
  //   throw new Error('User already exists!');
  // }
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateUserRoleInDB = async (id: string, newRole: TUser['role']) => {
  const result = await User.updateOne({ _id: id }, { $set: { role: newRole } });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.updateOne(
    { _id: id },
    { $set: { isDeleted: true } },
  );
  return result;
};

export const UserService = {
  createUserInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserRoleInDB,
  deleteUserFromDB,
};
