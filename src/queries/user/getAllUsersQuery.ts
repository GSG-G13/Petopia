import CustomError from '../../helpers/CustomError'
import { User } from '../../models'

const getAllUsersQuery = async (page: number, limit: number): Promise<object> => {
  try {
    const offset = (page - 1) * limit

    const users = await User.findAll(
      {
        attributes: [
          'fullName', 'email', 'userImage', 'profileImage',
          'address', 'phone', 'userType', 'status'
        ],
        limit,
        offset
      }
    )

    return users
  } catch (error) {
    throw new CustomError(500, 'Error retrieving users')
  }
}

export default getAllUsersQuery
