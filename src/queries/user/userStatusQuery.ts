import User from '../../models/User'
import { type IUser } from '../../interfaces/models'

const userStatusQuery = async (userId: number, status: string): Promise<IUser | null> => {
  const [numAffectedRows] = await User.update(
    { status },
    { where: { userId }, returning: true })

  if (numAffectedRows > 0) {
    const [updatedUser] = await User.findAll(
      {
        where: { userId },
        attributes:
        ['userId', 'fullName', 'email', 'userImage', 'profileImage', 'address', 'phone', 'userType', 'status']
      })
    return updatedUser || null
  }
  return null
}

export default userStatusQuery
