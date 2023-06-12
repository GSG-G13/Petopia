import User from '../../models/User'
import { type IUser } from '../../interfaces/models'

const loginQuery = async (userData: { email: string }): Promise<IUser | null> => {
  const { email } = userData

  try {
    const user = await User.findOne({
      attributes: ['user_id', 'full_name', 'email', 'password'],
      where: {
        email
      }
    })

    return user
  } catch (error) {
    console.error('Error during login query:', error)
    return null
  }
}

export default loginQuery
