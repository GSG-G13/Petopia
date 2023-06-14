import User from '../../models/User'
import { type IUser } from '../../interfaces/models'
import CustomError from '../../helpers/CustomError'

const loginQuery = async (userData: { email: string }): Promise<IUser | null> => {
  const { email } = userData

  try {
    const user = await User.findOne({
      where: {
        email
      }
    })

    return user
  } catch (error) {
    throw new CustomError(500, 'Internal Server Error')
  }
}

export default loginQuery
