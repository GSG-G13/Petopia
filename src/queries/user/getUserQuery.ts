import { type IUser } from '../../interfaces/models'
import { User } from '../../models'

const getUserQuery = async (id: number): Promise<IUser | null> =>
  await User.findOne({
    attributes: [
      'fullName', 'email', 'userImage', 'profileImage',
      'address', 'phone', 'userType', 'status'
    ],
    where: { userId: id }
  })
export default getUserQuery
