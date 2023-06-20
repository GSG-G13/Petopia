import { Op } from 'sequelize'
import { User } from '../../models'
import { type IUser } from '../../interfaces/fakeDataTypes'
import CustomError from '../../helpers/CustomError'

const searchAboutUserQuery = async (page: number, limit: number, fullName?: string): Promise<IUser[]> => {
  try {
    const offset = (page - 1) * limit
    const whereClause = fullName ? { fullName: { [Op.iLike]: `%${fullName}%` } } : {}

    const users = await User.findAll(
      {
        where: whereClause,
        attributes: [
          'fullName', 'email', 'userImage', 'profileImage',
          'address', 'phone'
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

export default searchAboutUserQuery
