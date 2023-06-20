import { Response, NextFunction } from 'express';
import { CustomRequest } from '../../interfaces/iAuth';
import { IUser } from '../../interfaces/fakeDataTypes';
import { getUserQuery, editUserQuery } from '../../queries/user/';
import bcrypt from 'bcrypt';
import { validateEditUser } from '../../validation/user/';
import CustomError from '../../helpers/CustomError';

interface UserData {
  fullName: string;
  email: string;
  password: string;
  userImage?: string;
  profileImage?: string;
  address?: string;
  phone?: string;
}

const updateUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId: number | undefined = req.user?.userId;
    if (userId === undefined) {
      throw new CustomError(401, 'User ID is missing or invalid');
    }

    const {
      fullName,
      email,
      password,
      userImage,
      profileImage,
      address,
      phone
    } = req.body as UserData;

    // Ensure that the user is updating their own information
    if (userId !== req.user?.userId) {
      throw new CustomError(401, 'You are unauthorized to update this user');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData: IUser = {
      fullName,
      email,
      password: hashedPassword,
      userImage,
      profileImage,
      address,
      phone
    };

    const user = await getUserQuery(Number(userId));
    if (user === null) {
      throw new CustomError(400, 'Bad Request');
    }

    const updatedUser = await editUserQuery(userId, await validateEditUser.validate(userData));

    res.status(200).json({
      message: 'User Profile Updated Successfully',
      data: {
        user: updatedUser
      }
    });
  } catch (err: unknown) {
    next(err);
  }
};

export default updateUser;
