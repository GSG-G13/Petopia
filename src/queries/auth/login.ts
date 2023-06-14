import User from '../../models/User'
import { type IUser } from '../../interfaces/models'
const loginQuery = async (userData: { email: string }): Promise<IUser | null> => {
  const { email } = userData
  const user = await User.findOne({
    where: {
      email
    }
  })
  return user
}
export default loginQuery
