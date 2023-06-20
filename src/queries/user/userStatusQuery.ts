import User from '../../models/User'
import { type IUser } from '../../interfaces/models'

const userStatusQuery = async (userId: number, status: string): Promise<IUser> => {
  const [, [user]] = await User.update(
    { status },
    { where: { userId }, returning: true }
  )

  return user
}

export default userStatusQuery
