import { type IUser } from '../../interfaces/fakeDataTypes'
import { User } from '../../models'

const updateUserQuery = async (userId: number, userData: IUser): Promise<IUser | null> => {
  const [count, [updatedUser]] = await User.update(
    { ...userData },
    {
      where: { userId },
      returning: true
    }
  )
  if (count === 0) {
    return null
  }
  return updatedUser
}
export default updateUserQuery
