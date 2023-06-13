import { type IUser } from '../../interfaces/models'
import { User } from '../../models'

const getUserQuery = async (id: number): Promise<IUser> =>
  await User.findOne({
    where: { userId: id }
  })
export default getUserQuery
