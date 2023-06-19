import CustomError from '../../helpers/CustomError'
import { User } from '../../models'

const getAllUsersQuery = async (): Promise<object> => {
  try {
    const users = await User.findAll()

    return users
  } catch (error) {
    throw new CustomError(500, 'Error retrieving users')
  }
}

export default getAllUsersQuery
