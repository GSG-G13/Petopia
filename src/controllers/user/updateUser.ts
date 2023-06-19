import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import { type IUser } from '../../interfaces/fakeDataTypes'
import { getUserQuery, editUserQuery } from '../../queries/user/'
import bcrypt from 'bcrypt'

import { validateEditUser } from '../../validation/user/'
import CustomError from '../../helpers/CustomError'

interface userData {
  fullName: string
  email: string
  password: string
  userImage?: string
  profileImage?: string
  address?: string
  phone?: string
}

const updateUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId
    const {
      fullName,
      email,
      password,
      userImage,
      profileImage,
      address,
      phone
    } = req.body as userData

    const hashedPassword = await bcrypt.hash(password, 10)

    const userData: IUser = { fullName, email, password: hashedPassword, userImage, profileImage, address, phone }

    const user = await getUserQuery(Number(userId))
    if (user === null) {
      throw new CustomError(400, 'Bad Request')
    }
    if (user.userId !== userId) {
      throw new CustomError(401, 'you are unauthorized to update this user')
    }
    const updatedUser = await editUserQuery(userId, await validateEditUser.validate(userData))

    res.status(200).json({
      message: 'User updated successfully',
      data: {
        user: updatedUser
      }
    })
  } catch (err: unknown) {
    console.log(err)
    next(err)
  }
}
export default updateUser
