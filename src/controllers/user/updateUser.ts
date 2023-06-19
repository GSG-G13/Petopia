import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import { type IUser } from '../../interfaces/fakeDataTypes'
import { getUserQuery } from '../../queries/user/getUserQuery'
import { updateUserQuery } from '../../queries/user/editUserQuery'
import { validateEditUser } from '../../validation/user/editUser'
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

const updatePost = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const {
      fullName,
      email,
      password,
      userImage,
      profileImage,
      address,
      phone
    } = req.body as userData
    console.log(userId)
    const userData: IUser = { fullName, email, password, userImage, profileImage, address, phone }

    if (userId < 0 || Number.isNaN(userId)) {
      throw new CustomError(400, 'Bad Request')
    }
    const user = await getUserQuery(Number(userId))
    if (user === null) {
      throw new CustomError(400, 'Bad Request')
    }
    if (user.userId !== userId) {
      throw new CustomError(401, 'you are unauthorized to update this user')
    }
    const updatedUser = await updateUserQuery(userId, await validateEditUser(userData))

    res.status(200).json({
      message: 'User updated successfully',
      data: {
        user: updatedUser
      }
    })
  } catch (err: unknown) {
    next(err)
  }
}
export default updatePost
