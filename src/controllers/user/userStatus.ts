import { type Request, type Response, type NextFunction } from 'express'
import { userStatusQuery } from '../../queries'
import { type IUser } from '../../interfaces/models'
import { validateStatus, validateUserId } from '../../validation'

const updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status }: { status: string } = await validateStatus.validate(req.body)

    const { userId } = await validateUserId.validate(req.params)

    const {
      fullName,
      email,
      userImage,
      profileImage,
      address,
      phone,
      userType
    }: IUser =
    await userStatusQuery(Number(userId), status)

    res.json({
      message: 'Status Updated Successfully',
      data: {
        userId,
        fullName,
        email,
        userImage,
        profileImage,
        address,
        phone,
        userType,
        status
      }
    })
  } catch (err: unknown) {
    next(err)
  }
}

export default updateStatus
