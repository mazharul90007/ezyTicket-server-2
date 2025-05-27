import { Request, Response } from 'express';
import { UserService } from './user.service';
import { TUser } from './user.interface';

const createUser = async (req: Request, res: Response) => {
  try {
    // const email = req.params.email;
    const { user: userData } = req.body;
    // const query = { email };

    const result = await UserService.createUserInDB({
      ...(userData as TUser),
      createdAt: new Date(),
    });

    res.status(200).json({
      success: true,
      message: 'User Inserted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'All User data are retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data',
      error: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const result = await UserService.getSingleUserFromDB(email);
    res.status(200).json({
      success: true,
      message: 'User data has been retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data',
      error: error.message,
    });
  }
};

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const result = await UserService.updateUserRoleInDB(id, role);

    res.status(200).json({
      success: true,
      message: 'User role has been updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User role update failed',
      error: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserService.deleteUserFromDB(id);

    res.status(200).json({
      success: true,
      message: 'User isDeleted has been updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User isDelete update failed',
      error: error.message,
    });
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const updateData = req.body;
    const result = await UserService.updateUserProfileInDB(email, updateData);

    res.status(200).json({
      success: true,
      message: 'User Profile has been updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User Profile update failed',
      error: error.message,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  updateUserProfile,
};
